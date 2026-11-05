import * as THREE from 'three';
import TWEEN from 'three/addons/libs/tween.module.js';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';

// ===================== Config =====================
const CLIENT_ID = '424994039227-qpgkeik315om4tt5hiqpub8okqgj31cl.apps.googleusercontent.com';
const SHEET_ID = '1bXC748HkRgar7QC0x5yDsFO1wSFFgvLzO1Fs2Y4ma64';
const SHEET_GID = 1956314778; // the "gid=" in the sheet URL
const SCOPE = 'https://www.googleapis.com/auth/spreadsheets.readonly';

// ===================== Login =====================
let tokenClient = null;

document.getElementById('googleBtn').addEventListener('click', function() {

    showError('');

    if (!window.google || !google.accounts || !google.accounts.oauth2) {
        showError('Google script is still loading, please try again in a moment.');
        return;
    }

    if (!tokenClient) {
        tokenClient = google.accounts.oauth2.initTokenClient({
            client_id: CLIENT_ID,
            scope: SCOPE,
            callback: onToken,
            error_callback: function(err) {
                showError('Login failed: ' + (err.type || 'unknown error'));
            }
        });
    }

    tokenClient.requestAccessToken();

});

async function onToken(resp) {

    if (resp.error) {
        showError('Login failed: ' + resp.error);
        return;
    }

    try {

        const rows = await loadSheet(resp.access_token);

        document.getElementById('login').style.display = 'none';
        document.getElementById('app').style.display = 'block';

        init(rows);
        animate();

    } catch (e) {

        console.error(e);
        showError(e.message);

    }

}

function showError(msg) {
    document.getElementById('loginError').textContent = msg;
}

// ===================== Sheet =====================
async function loadSheet(token) {

    const headers = { Authorization: 'Bearer ' + token };
    const base = 'https://sheets.googleapis.com/v4/spreadsheets/' + SHEET_ID;

    // find the tab name from its gid
    const metaRes = await fetch(base + '?fields=sheets.properties(sheetId,title)', { headers });
    if (!metaRes.ok) throw new Error('Cannot open the sheet (HTTP ' + metaRes.status + '). Check Sheets API is enabled and this account has access.');

    const meta = await metaRes.json();
    const found = meta.sheets.find(s => s.properties.sheetId === SHEET_GID) || meta.sheets[0];
    const title = found.properties.title;

    const range = encodeURIComponent("'" + title.replace(/'/g, "''") + "'");
    const res = await fetch(base + '/values/' + range, { headers });
    if (!res.ok) throw new Error('Cannot read the sheet (HTTP ' + res.status + ').');

    const json = await res.json();
    let values = json.values || [];

    // skip header row if the age column is not a number
    if (values.length && isNaN(parseInt(values[0][2], 10))) values = values.slice(1);

    // columns: 0 name, 1 photo, 2 age, 3 country, 4 interest, 5 net worth
    return values
        .filter(r => r[0])
        .map(r => ({
            name: r[0],
            photo: r[1] || '',
            age: r[2] || '',
            country: r[3] || '',
            interest: r[4] || '',
            netWorthText: r[5] || '',
            netWorth: parseFloat(String(r[5] || '0').replace(/[^0-9.\-]/g, '')) || 0
        }));

}

// ===================== 3D =====================
let camera, scene, renderer, controls;

const objects = [];
const targets = { table: [], sphere: [], helix: [], grid: [], tetrahedron: [] };

function netWorthColor(v) {

    if (v > 200000) return '58,159,72'; // green
    if (v > 100000) return '253,160,53'; // orange
    return '239,48,34'; // red

}

function init(data) {

    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 3500;

    scene = new THREE.Scene();

    for (let i = 0; i < data.length; i++) {

        const p = data[i];
        const rgb = netWorthColor(p.netWorth);

        const element = document.createElement('div');
        element.className = 'element';
        element.style.backgroundColor = 'rgba(' + rgb + ',0.25)';
        element.style.borderColor = 'rgba(' + rgb + ',0.9)';
        element.style.boxShadow = '0px 0px 12px rgba(' + rgb + ',0.6)';
        element.title = p.name + ' - ' + p.netWorthText;

        const country = document.createElement('div');
        country.className = 'country';
        country.textContent = p.country;
        element.appendChild(country);

        const age = document.createElement('div');
        age.className = 'age';
        age.textContent = p.age;
        element.appendChild(age);

        const img = document.createElement('img');
        img.src = p.photo;
        img.referrerPolicy = 'no-referrer';
        element.appendChild(img);

        const name = document.createElement('div');
        name.className = 'name';
        name.textContent = p.name;
        element.appendChild(name);

        const interest = document.createElement('div');
        interest.className = 'interest';
        interest.textContent = p.interest;
        element.appendChild(interest);

        const objectCSS = new CSS3DObject(element);
        objectCSS.position.x = Math.random() * 4000 - 2000;
        objectCSS.position.y = Math.random() * 4000 - 2000;
        objectCSS.position.z = Math.random() * 4000 - 2000;
        scene.add(objectCSS);

        objects.push(objectCSS);

    }

    const count = objects.length;
    const vector = new THREE.Vector3();

    // table: 20 columns x 10 rows

    for (let i = 0; i < count; i++) {

        const object = new THREE.Object3D();

        object.position.x = (i % 20) * 140 - 1330;
        object.position.y = -Math.floor(i / 20) * 180 + 810;

        targets.table.push(object);

    }

    // sphere

    for (let i = 0; i < count; i++) {

        const phi = Math.acos(-1 + (2 * i) / count);
        const theta = Math.sqrt(count * Math.PI) * phi;

        const object = new THREE.Object3D();

        object.position.setFromSphericalCoords(800, phi, theta);

        vector.copy(object.position).multiplyScalar(2);
        object.lookAt(vector);

        targets.sphere.push(object);

    }

    // double helix: even index = strand A, odd index = strand B (180 degrees apart)

    const perStrand = Math.ceil(count / 2);

    for (let i = 0; i < count; i++) {

        const strand = i % 2;
        const k = Math.floor(i / 2);

        const theta = k * 0.35 + strand * Math.PI;
        const y = -(k * 20) + (perStrand * 20) / 2;

        const object = new THREE.Object3D();

        object.position.setFromCylindricalCoords(900, theta, y);

        vector.x = object.position.x * 2;
        vector.y = object.position.y;
        vector.z = object.position.z * 2;

        object.lookAt(vector);

        targets.helix.push(object);

    }

    // grid: 5 x 4 x 10

    for (let i = 0; i < count; i++) {

        const object = new THREE.Object3D();

        object.position.x = (i % 5) * 400 - 800;
        object.position.y = -(Math.floor(i / 5) % 4) * 400 + 600;
        object.position.z = Math.floor(i / 20) * 600 - 2700;

        targets.grid.push(object);

    }

    // tetrahedron: 4 triangular faces, tiles spread evenly over each face

    const R = 750;

    const V = [
        new THREE.Vector3(1, 1, 1),
        new THREE.Vector3(1, -1, -1),
        new THREE.Vector3(-1, 1, -1),
        new THREE.Vector3(-1, -1, 1)
    ].map(v => v.multiplyScalar(R));

    const perFace = Math.ceil(count / 4);

    let rows = 1;
    while ((rows * (rows + 1)) / 2 < perFace) rows++;

    const faces = [];

    for (let f = 0; f < 4; f++) {

        // face f is the one opposite vertex f
        const [A, B, C] = V.filter((_, idx) => idx !== f);
        const normal = V[f].clone().negate().normalize();
        const points = [];
        const n = rows - 1;

        for (let a = 0; a <= n; a++) {

            for (let b = 0; b <= n - a; b++) {

                const c = n - a - b;

                // weights keep every point strictly inside the face
                const point = new THREE.Vector3()
                    .addScaledVector(A, a + 1 / 3)
                    .addScaledVector(B, b + 1 / 3)
                    .addScaledVector(C, c + 1 / 3)
                    .divideScalar(rows);

                points.push(point);

            }

        }

        faces.push({ points, normal });

    }

    for (let i = 0; i < count; i++) {

        const face = faces[i % 4];

        const object = new THREE.Object3D();

        object.position.copy(face.points[Math.floor(i / 4)]);
        object.lookAt(object.position.clone().add(face.normal));

        targets.tetrahedron.push(object);

    }

    // renderer + controls

    renderer = new CSS3DRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('container').appendChild(renderer.domElement);

    controls = new TrackballControls(camera, renderer.domElement);
    controls.minDistance = 500;
    controls.maxDistance = 6000;
    controls.addEventListener('change', render);

    document.getElementById('table').addEventListener('click', function() {
        transform(targets.table, 2000);
    });

    document.getElementById('sphere').addEventListener('click', function() {
        transform(targets.sphere, 2000);
    });

    document.getElementById('helix').addEventListener('click', function() {
        transform(targets.helix, 2000);
    });

    document.getElementById('grid').addEventListener('click', function() {
        transform(targets.grid, 2000);
    });

    document.getElementById('tetrahedron').addEventListener('click', function() {
        transform(targets.tetrahedron, 2000);
    });

    transform(targets.table, 2000);

    window.addEventListener('resize', onWindowResize);

}

function transform(targets, duration) {

    TWEEN.removeAll();

    for (let i = 0; i < objects.length; i++) {

        const object = objects[i];
        const target = targets[i];

        new TWEEN.Tween(object.position)
            .to({ x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start();

        new TWEEN.Tween(object.rotation)
            .to({ x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start();

    }

    new TWEEN.Tween({})
        .to({}, duration * 2)
        .onUpdate(render)
        .start();

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    render();

}

function animate() {

    requestAnimationFrame(animate);

    TWEEN.update();

    controls.update();

}

function render() {

    renderer.render(scene, camera);

}

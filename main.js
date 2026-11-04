// symbol, name, weight, column, row
const table = [
    'H', 'Hydrogen', '1.00794', 1, 1,
    'He', 'Helium', '4.002602', 18, 1,
    'Li', 'Lithium', '6.941', 1, 2,
    'Be', 'Beryllium', '9.012182', 2, 2,
    'B', 'Boron', '10.811', 13, 2,
    'C', 'Carbon', '12.0107', 14, 2,
    'N', 'Nitrogen', '14.0067', 15, 2,
    'O', 'Oxygen', '15.9994', 16, 2,
    'F', 'Fluorine', '18.9984032', 17, 2,
    'Ne', 'Neon', '20.1797', 18, 2,
    'Na', 'Sodium', '22.98976...', 1, 3,
    'Mg', 'Magnesium', '24.305', 2, 3,
    'Al', 'Aluminium', '26.9815386', 13, 3,
    'Si', 'Silicon', '28.0855', 14, 3,
    'P', 'Phosphorus', '30.973762', 15, 3,
    'S', 'Sulfur', '32.065', 16, 3,
    'Cl', 'Chlorine', '35.453', 17, 3,
    'Ar', 'Argon', '39.948', 18, 3,
    'K', 'Potassium', '39.948', 1, 4,
    'Ca', 'Calcium', '40.078', 2, 4,
    'Sc', 'Scandium', '44.955912', 3, 4,
    'Ti', 'Titanium', '47.867', 4, 4,
    'V', 'Vanadium', '50.9415', 5, 4,
    'Cr', 'Chromium', '51.9961', 6, 4,
    'Mn', 'Manganese', '54.938045', 7, 4,
    'Fe', 'Iron', '55.845', 8, 4,
    'Co', 'Cobalt', '58.933195', 9, 4,
    'Ni', 'Nickel', '58.6934', 10, 4,
    'Cu', 'Copper', '63.546', 11, 4,
    'Zn', 'Zinc', '65.38', 12, 4,
    'Ga', 'Gallium', '69.723', 13, 4,
    'Ge', 'Germanium', '72.63', 14, 4,
    'As', 'Arsenic', '74.9216', 15, 4,
    'Se', 'Selenium', '78.96', 16, 4,
    'Br', 'Bromine', '79.904', 17, 4,
    'Kr', 'Krypton', '83.798', 18, 4,
    'Rb', 'Rubidium', '85.4678', 1, 5,
    'Sr', 'Strontium', '87.62', 2, 5,
    'Y', 'Yttrium', '88.90585', 3, 5,
    'Zr', 'Zirconium', '91.224', 4, 5,
    'Nb', 'Niobium', '92.90628', 5, 5,
    'Mo', 'Molybdenum', '95.96', 6, 5,
    'Tc', 'Technetium', '(98)', 7, 5,
    'Ru', 'Ruthenium', '101.07', 8, 5,
    'Rh', 'Rhodium', '102.9055', 9, 5,
    'Pd', 'Palladium', '106.42', 10, 5,
    'Ag', 'Silver', '107.8682', 11, 5,
    'Cd', 'Cadmium', '112.411', 12, 5,
    'In', 'Indium', '114.818', 13, 5,
    'Sn', 'Tin', '118.71', 14, 5,
    'Sb', 'Antimony', '121.76', 15, 5,
    'Te', 'Tellurium', '127.6', 16, 5,
    'I', 'Iodine', '126.90447', 17, 5,
    'Xe', 'Xenon', '131.293', 18, 5,
    'Cs', 'Caesium', '132.9054', 1, 6,
    'Ba', 'Barium', '132.9054', 2, 6,
    'La', 'Lanthanum', '138.90547', 4, 9,
    'Ce', 'Cerium', '140.116', 5, 9,
    'Pr', 'Praseodymium', '140.90765', 6, 9,
    'Nd', 'Neodymium', '144.242', 7, 9,
    'Pm', 'Promethium', '(145)', 8, 9,
    'Sm', 'Samarium', '150.36', 9, 9,
    'Eu', 'Europium', '151.964', 10, 9,
    'Gd', 'Gadolinium', '157.25', 11, 9,
    'Tb', 'Terbium', '158.92535', 12, 9,
    'Dy', 'Dysprosium', '162.5', 13, 9,
    'Ho', 'Holmium', '164.93032', 14, 9,
    'Er', 'Erbium', '167.259', 15, 9,
    'Tm', 'Thulium', '168.93421', 16, 9,
    'Yb', 'Ytterbium', '173.054', 17, 9,
    'Lu', 'Lutetium', '174.9668', 18, 9,
    'Hf', 'Hafnium', '178.49', 4, 6,
    'Ta', 'Tantalum', '180.94788', 5, 6,
    'W', 'Tungsten', '183.84', 6, 6,
    'Re', 'Rhenium', '186.207', 7, 6,
    'Os', 'Osmium', '190.23', 8, 6,
    'Ir', 'Iridium', '192.217', 9, 6,
    'Pt', 'Platinum', '195.084', 10, 6,
    'Au', 'Gold', '196.966569', 11, 6,
    'Hg', 'Mercury', '200.59', 12, 6,
    'Tl', 'Thallium', '204.3833', 13, 6,
    'Pb', 'Lead', '207.2', 14, 6,
    'Bi', 'Bismuth', '208.9804', 15, 6,
    'Po', 'Polonium', '(209)', 16, 6,
    'At', 'Astatine', '(210)', 17, 6,
    'Rn', 'Radon', '(222)', 18, 6,
    'Fr', 'Francium', '(223)', 1, 7,
    'Ra', 'Radium', '(226)', 2, 7,
    'Ac', 'Actinium', '(227)', 4, 10,
    'Th', 'Thorium', '232.03806', 5, 10,
    'Pa', 'Protactinium', '231.0588', 6, 10,
    'U', 'Uranium', '238.02891', 7, 10,
    'Np', 'Neptunium', '(237)', 8, 10,
    'Pu', 'Plutonium', '(244)', 9, 10,
    'Am', 'Americium', '(243)', 10, 10,
    'Cm', 'Curium', '(247)', 11, 10,
    'Bk', 'Berkelium', '(247)', 12, 10,
    'Cf', 'Californium', '(251)', 13, 10,
    'Es', 'Einstenium', '(252)', 14, 10,
    'Fm', 'Fermium', '(257)', 15, 10,
    'Md', 'Mendelevium', '(258)', 16, 10,
    'No', 'Nobelium', '(259)', 17, 10,
    'Lr', 'Lawrencium', '(262)', 18, 10,
    'Rf', 'Rutherfordium', '(267)', 4, 7,
    'Db', 'Dubnium', '(268)', 5, 7,
    'Sg', 'Seaborgium', '(271)', 6, 7,
    'Bh', 'Bohrium', '(272)', 7, 7,
    'Hs', 'Hassium', '(270)', 8, 7,
    'Mt', 'Meitnerium', '(276)', 9, 7,
    'Ds', 'Darmstadium', '(281)', 10, 7,
    'Rg', 'Roentgenium', '(280)', 11, 7,
    'Cn', 'Copernicium', '(285)', 12, 7,
    'Nh', 'Nihonium', '(286)', 13, 7,
    'Fl', 'Flerovium', '(289)', 14, 7,
    'Mc', 'Moscovium', '(290)', 15, 7,
    'Lv', 'Livermorium', '(293)', 16, 7,
    'Ts', 'Tennessine', '(294)', 17, 7,
    'Og', 'Oganesson', '(294)', 18, 7
];
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
const targets = { table: [], sphere: [], helix: [], grid: [] };

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
const modalPlat = document.getElementById('modalPlat');

modalPlat.addEventListener('show.bs.modal', (event) => {
  const bouton = event.relatedTarget;
  if (!bouton) return;
  modalPlat.querySelector('.modal-title').textContent = bouton.getAttribute('data-nom');
  modalPlat.querySelector('.modal-plat-image').src = bouton.getAttribute('data-image');
  modalPlat.querySelector('.modal-plat-image').alt = bouton.getAttribute('data-nom');
  modalPlat.querySelector('.modal-plat-description').textContent = bouton.getAttribute('data-description');
  modalPlat.querySelector('.modal-plat-prix').textContent = bouton.getAttribute('data-prix') + ' DT';
});

const listePlats = document.getElementById('liste-plats');
let tousLesPlats = [];

function carteHtml(plat) {
  const badge = plat.nouveau ? `<span class="badge text-bg-success">Nouveau</span>` : '';
  return `
    <div class="col">
      <div class="card h-100">
        <img src="${plat.image}" class="card-img-top" alt="${plat.nom}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${plat.nom}</h5>
          <p class="card-text">${plat.description}</p>
          <div class="mt-auto">
            <button class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#modalPlat" data-nom="${plat.nom}" data-image="${plat.image}" data-description="${plat.description}" data-prix="${plat.prix}">Voir le détail</button>
          </div>
        </div>
        <div class="card-footer d-flex justify-content-between align-items-center">
          <span class="fw-bold">${plat.prix} DT</span>
          ${badge}
        </div>
      </div>
    </div>`;
}

function afficherPlats(plats) {
  listePlats.innerHTML = plats.map(carteHtml).join('');
}

fetch('data/plats.json')
  .then((reponse) => {
    if (!reponse.ok) throw new Error('HTTP ' + reponse.status);
    return reponse.json();
  })
  .then((plats) => {
    tousLesPlats = plats;
    afficherPlats(plats);
  })
  .catch((erreur) => {
    listePlats.innerHTML = `<div class="col-12"><div class="alert alert-danger">Impossible de charger le menu (${erreur.message}).</div></div>`;
  });

document.getElementById('filtre-plats').addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-categorie]');
  if (!btn) return;
  document.querySelectorAll('#filtre-plats button').forEach((b) => b.classList.remove('active'));
  btn.classList.add('active');
  const cat = btn.dataset.categorie;
  afficherPlats(cat === 'Tous' ? tousLesPlats : tousLesPlats.filter((p) => p.categorie === cat));
});

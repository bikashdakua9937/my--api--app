const apiUrl = '/api/items';

async function fetchItems() {
  const res = await fetch(apiUrl);
  const items = await res.json();

  const list = document.getElementById('item-list');
  list.innerHTML = '';
  items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item.name;

    const btn = document.createElement('button');
    btn.textContent = 'Delete';
    btn.onclick = () => deleteItem(item.id);

    li.appendChild(btn);
    list.appendChild(li);
  });
}

async function addItem() {
  const input = document.getElementById('item-name');
  const name = input.value;
  if (!name) return;

  await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  });

  input.value = '';
  fetchItems();
}

async function deleteItem(id) {
  await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
  fetchItems();
}

window.onload = fetchItems;

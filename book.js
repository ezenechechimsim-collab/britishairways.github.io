 /* trip type tabs */
  document.querySelectorAll('.trip-tab').forEach(tab=>{
    tab.addEventListener('click', ()=>{
      document.querySelectorAll('.trip-tab').forEach(t=>t.classList.remove('active'));
      tab.classList.add('active');
      const returnDate = document.getElementById('returnDate');
      returnDate.closest('.field').style.opacity = tab.dataset.trip === 'one-way' ? '0.35' : '1';
      returnDate.disabled = tab.dataset.trip === 'one-way';
    });
  });

  /* swap from/to */
  document.getElementById('swapBtn').addEventListener('click', ()=>{
    const from = document.getElementById('fromField');
    const to = document.getElementById('toField');
    const tmp = from.value; from.value = to.value; to.value = tmp;
  });

  /* select flight card */
  document.querySelectorAll('.flight-card').forEach(card=>{
    card.addEventListener('click', ()=>{
      document.querySelectorAll('.flight-card').forEach(c=>c.classList.remove('selected'));
      card.classList.add('selected');
      const price = Number(card.dataset.price);
      const taxes = 96;
      document.getElementById('sumFare').textContent = '$' + price;
      document.getElementById('sumTotal').textContent = '$' + (price + taxes);
    });
  });
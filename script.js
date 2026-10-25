const form = document.getElementById('hydrationForm');
const emptyState = document.getElementById('emptyState');
const resultState = document.getElementById('resultState');
const resultCard = document.getElementById('resultCard');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const age = Number(document.getElementById('age').value);
  const weight = Number(document.getElementById('weight').value);
  const activity = Number(document.getElementById('activity').value);
  const height = Number(document.getElementById('height').value);

  if (!age || age < 1 || age > 120) {
    alert('Informe uma idade válida.');
    return;
  }
  if (weight && (weight < 2 || weight > 350)) {
    alert('Confira o peso informado.');
    return;
  }
  if (height && (height < 50 || height > 250)) {
    alert('Confira a altura informada em centímetros.');
    return;
  }

  // Regra escolar simplificada: não é uma prescrição clínica.
  // Para adultos, usa 30–35 ml/kg como referência aproximada quando há peso.
  // Sem peso, apresenta uma faixa educativa geral; em menores, evita extrapolar
  // a fórmula adulta e informa que as necessidades dependem da faixa etária.
  let ml;
  let message;

  if (age < 14) {
    ml = weight ? Math.min(2200, Math.max(1000, weight * 40)) : 1600;
    message = 'Para crianças e adolescentes, a necessidade varia bastante com a idade, crescimento e atividade. Use este valor apenas como referência educativa e converse com um responsável ou profissional de saúde para orientações individuais.';
  } else if (age < 18) {
    ml = weight ? Math.min(3000, Math.max(1500, weight * 35)) : 2200;
    message = 'Na adolescência, a necessidade pode mudar conforme o crescimento, o calor e os exercícios. Esta é uma estimativa simplificada, não uma meta obrigatória: distribua os líquidos ao longo do dia e respeite sua sede.';
  } else {
    ml = weight ? Math.min(4000, Math.max(1500, weight * 32)) : 2200;
    message = 'Esta é uma estimativa inicial. Em dias quentes ou com exercício, você pode precisar de mais líquidos. Alimentos também fornecem água, e não é necessário beber tudo de uma vez.';
  }

  if (activity === 2) ml += 250;
  if (activity === 3) ml += 500;
  ml = Math.round(ml / 100) * 100;

  const liters = (ml / 1000).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  document.getElementById('liters').textContent = liters;
  document.getElementById('mlValue').textContent = ml.toLocaleString('pt-BR') + ' ml por dia';
  document.getElementById('resultMessage').textContent = message;
  document.getElementById('progressBar').style.width = Math.min(100, ml / 3500 * 100) + '%';

  emptyState.hidden = true;
  resultState.hidden = false;
  resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

document.getElementById('resetBtn').addEventListener('click', function () {
  form.reset();
  resultState.hidden = true;
  emptyState.hidden = false;
  document.getElementById('progressBar').style.width = '0%';
  document.getElementById('age').focus();
});

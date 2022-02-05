const today = new Date();
const dayOfTheWeek = today.getDay();
let message1 = '';

if (dayOfTheWeek >= 1 && dayOfTheWeek <= 5) {
  message1 = 'Hang in there!';
} else {
  message1 = 'Woohoo!  It is the weekend!';
}

let message2 = '';

switch (dayOfTheWeek) {
  case 0:
    message2 = 'Sunday';
    break;
  case 1:
    message2 = 'Monday';
    break;
  case 2:
    message2 = 'Tuesday';
    break;
  case 3:
    message2 = 'Wednesday';
    break;
  case 4:
    message2 = 'Thursday';
    break;
  case 5:
    message2 = 'Friday';
    break;
  case 6:
    message2 = 'Saturday';
    break;
}

(() => {
  document.getElementById('message1').innerText = message1;
  document.getElementById('message2').innerText = message2;
})()

const listOfExamples = [];

const fetchTemplates = async () => {
  const elements = await fetch('https://byui-cse.github.io/cse121b-course/week05/temples.json');
  return elements.json();
}

const output = (list) => {
  if (Array.isArray(list)) {
    let html = '<article>';
    list.forEach(item => {
      html += `<h3>${item.templeName}</h3>`;
      html += `<h4>${item.location}</h4>`;
      html += `<h4>${item.dedicated}</h4>`;
      html += `<img src="${item.imageUrl}" alt="${item.templeName}" />`;
    })

    html += '</article>';
    document.getElementById('temples').innerHTML = html;

    return;
  }

  throw `list parameter should be an array, got ${typeof list}`;
}

const reset = () => {
  document.getElementById('temples').innerHTML = '';
}

const sortBy = async () => {
  reset();
  const sortBy = document.getElementById('sortBy').value;

  const templates = await fetchTemplates();
  return templates.sort((a, b) => {
    if (sortBy === 'templeNameAscending') {
      return a.templeName < b.templeName ? -1 : 1;
    }

    if (sortBy === 'templeNameDescending') {
      return a.templeName > b.templeName ? -1 : 1;
    }

    return 0;
  })
}

(async () => {
  const elements = await fetchTemplates();
  output(elements);

  document.getElementById('sortBy').addEventListener('change', async () => {
    const sortedValues = await sortBy();
    output(sortedValues);
  });
})();

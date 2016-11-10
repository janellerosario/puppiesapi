function getAllPuppies() {
  return fetch('/api/puppies')
    .then(r => r.json());
}

function adoptPuppy(payload) {
  return fetch('/api/puppies', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

function likePuppy(p) {
  // Implement liking a puppy here.
  let id = parseInt(p.target.id);
  console.log(id);
  return fetch(`/api/puppies/${id}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'PUT',
  });
}

function abandonPuppy(p) {
  // Implement abandoning a puppy here :(
  let id = parseInt(p.target.id);
  console.log(id);
  return fetch(`/api/puppies/${id}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'DELETE',
  });
}


function renderPuppies(puppies) {
  const $container = $('.adopted-puppies').empty();
  for (let i = 0; i < puppies.length; i += 1) {
    const $newPuppy = $('.puppy-template').clone();

    $newPuppy.removeClass('puppy-template')
      .addClass('puppy')
      .find('.name').text(puppies[i].name);

    $newPuppy
      .find('.likes').text(puppies[i].likes);

    $newPuppy
      .find('.abandon-puppy')
      .prop('id', puppies[i].id);

    $newPuppy
      .find('.puppy-picture img')
      .attr('src', puppies[i].url);

    // You should add a button for liking here
    const $newButton = $('<button>').text('LIKE');
    $newButton.attr('id', puppies[i].id);
    $newButton.on('click', likePuppy);

    // you should add a button for abandoning here
    const $newButton2 = $('<button>').text('ABANDON');
    $newButton2.attr('id', puppies[i].id);
    $newButton2.on('click', abandonPuppy);

    $container.append($newPuppy);
    $newPuppy.append($newButton);
    $newPuppy.append($newButton2);
  }
}

function registerLikeButtonHandler() {
  // implement like button listener here.

}

function registerAbandonButtonHandler() {
  // implement abandon button listener here. :(
}


function registerFormHandler() {
  $('form').on('submit', function(e) {
    e.preventDefault();
    const $form = $(this);
    const puppy = {
      name: $form.find('[name=name]').val(),
      url: $form.find('[name=url]').val()
    };

    adoptPuppy(puppy).then(() => {
      getAllPuppies().then(renderPuppies);
    });
  });
}


$(() => {
  registerFormHandler();
  registerLikeButtonHandler();
  registerAbandonButtonHandler();
  getAllPuppies().then(renderPuppies);
});

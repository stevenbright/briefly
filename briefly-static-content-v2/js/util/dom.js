
//
// TODO: remove this
//

export function setOnclickIfPresent(id, handler) {
  const $e = document.getElementById(id);
  if ($e != null) {
    $e.onclick = handler;
  }
}

export function getHtml(url) {
  return requestObject({
    method: 'GET',
    url: '/g/part/books?offset=' + entries.length,
    accept: 'text/html',
    responseType: 'text'
  });
}

export function getAndAppendHtml(url, $loadControl, $container) {
  $loadControl.disabled = true;

  const promise = getHtml(url);

  return promise.then((data) => {
    $loadControl.disabled = false;
    $container.insertAdjacentHTML('beforeend', data);
  }, (err) => {
    $loadControl.disabled = false;
    console.error("Error while loading HTML", err);
  });
}

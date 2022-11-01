function findLRC() {
    document.getElementById('container').innerHTML = ''
    lrc = [];

    lrc.length = 0;
    ur = document.getElementById('input').value;
    ur = ur.split(/[/?]+/);
    array = Array.from(ur)
    id = array[3]

    let url = `https://spotify-lyric-api.herokuapp.com/?trackid=${id}&format=lrc`;

    console.log(url)

    fetch(url)
        .then(res => res.json())
        .then(function (response) {
            console.log(response.lines)
            lrc.push(response.lines)
            a = Object.fromEntries(lrc);
            console.log(a);

            lrc.forEach(function (m) {

                for (const key in m) {
                    document.getElementById('container').innerHTML += '<span class="timeline">' + '[' + JSON.stringify(m[key].timeTag).replace(/"/g, '') + ']' + '</span>' + JSON.stringify(m[key].words).replace(/"/g, '') + "<br>";
                }

            });
        })
        .catch(err => { document.getElementById('container').innerHTML = 'Spotify track not found or invalid url' });


}

checkbox = document.getElementById('chexkbox');

checkbox.addEventListener('change', function () {
    if (this.checked) {
        document.querySelectorAll('.timeline').forEach(el=>el.classList.remove('display'));
        console.log('checked')
    } else {
        document.querySelectorAll('.timeline').forEach(el=>el.classList.add('display'));
        console.log('unchecked')
    }
});
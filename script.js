function findLRC() {
    document.getElementById('container').innerHTML = ''
    lrc = [];
    synced = [];
    nonSynced = [];

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

                for (const key in m) {
                    b = JSON.stringify(m[key].timeTag).replace(/"/g, '');
                    c = JSON.stringify(m[key].words).replace(/"/g, '');
                    synced.push(`[${b}]${c}`);
                }

                for (const key in m) {
                    c = JSON.stringify(m[key].words).replace(/"/g, '');
                    nonSynced.push(`${c}`);
                }

            });

            console.log(synced);


        })
        .catch(err => { document.getElementById('container').innerHTML = 'Spotify track not found or invalid url' });


}

checkbox = document.getElementById('chexkbox');

checkbox.addEventListener('change', function () {
    copy_btn = document.getElementById('copy_btn');
    if (this.checked) {
        document.querySelectorAll('.timeline').forEach(el=>el.classList.remove('display'));
        copy_btn.removeAttribute("onclick");
        copy_btn.setAttribute("onclick", "S_copy()");
    } else {
        document.querySelectorAll('.timeline').forEach(el=>el.classList.add('display'));
        copy_btn.removeAttribute("onclick");
        copy_btn.setAttribute("onclick", "N_copy()");
    }
});

function S_copy() {
    navigator.clipboard.writeText(synced.join('\n'));
}

function N_copy() {
    navigator.clipboard.writeText(nonSynced.join('\n'));
}

function copied() {
    document.getElementById('copy_btn').innerHTML = 'copied!'
}

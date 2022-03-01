var MD5 = function (d) { var r = M(V(Y(X(d), 8 * d.length))); return r.toLowerCase() }; function M(d) { for (var _, m = "0123456789ABCDEF", f = "", r = 0; r < d.length; r++)_ = d.charCodeAt(r), f += m.charAt(_ >>> 4 & 15) + m.charAt(15 & _); return f } function X(d) { for (var _ = Array(d.length >> 2), m = 0; m < _.length; m++)_[m] = 0; for (m = 0; m < 8 * d.length; m += 8)_[m >> 5] |= (255 & d.charCodeAt(m / 8)) << m % 32; return _ } function V(d) { for (var _ = "", m = 0; m < 32 * d.length; m += 8)_ += String.fromCharCode(d[m >> 5] >>> m % 32 & 255); return _ } function Y(d, _) { d[_ >> 5] |= 128 << _ % 32, d[14 + (_ + 64 >>> 9 << 4)] = _; for (var m = 1732584193, f = -271733879, r = -1732584194, i = 271733878, n = 0; n < d.length; n += 16) { var h = m, t = f, g = r, e = i; f = md5_ii(f = md5_ii(f = md5_ii(f = md5_ii(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_ff(f = md5_ff(f = md5_ff(f = md5_ff(f, r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 0], 7, -680876936), f, r, d[n + 1], 12, -389564586), m, f, d[n + 2], 17, 606105819), i, m, d[n + 3], 22, -1044525330), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 4], 7, -176418897), f, r, d[n + 5], 12, 1200080426), m, f, d[n + 6], 17, -1473231341), i, m, d[n + 7], 22, -45705983), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 8], 7, 1770035416), f, r, d[n + 9], 12, -1958414417), m, f, d[n + 10], 17, -42063), i, m, d[n + 11], 22, -1990404162), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 12], 7, 1804603682), f, r, d[n + 13], 12, -40341101), m, f, d[n + 14], 17, -1502002290), i, m, d[n + 15], 22, 1236535329), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 1], 5, -165796510), f, r, d[n + 6], 9, -1069501632), m, f, d[n + 11], 14, 643717713), i, m, d[n + 0], 20, -373897302), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 5], 5, -701558691), f, r, d[n + 10], 9, 38016083), m, f, d[n + 15], 14, -660478335), i, m, d[n + 4], 20, -405537848), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 9], 5, 568446438), f, r, d[n + 14], 9, -1019803690), m, f, d[n + 3], 14, -187363961), i, m, d[n + 8], 20, 1163531501), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 13], 5, -1444681467), f, r, d[n + 2], 9, -51403784), m, f, d[n + 7], 14, 1735328473), i, m, d[n + 12], 20, -1926607734), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 5], 4, -378558), f, r, d[n + 8], 11, -2022574463), m, f, d[n + 11], 16, 1839030562), i, m, d[n + 14], 23, -35309556), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 1], 4, -1530992060), f, r, d[n + 4], 11, 1272893353), m, f, d[n + 7], 16, -155497632), i, m, d[n + 10], 23, -1094730640), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 13], 4, 681279174), f, r, d[n + 0], 11, -358537222), m, f, d[n + 3], 16, -722521979), i, m, d[n + 6], 23, 76029189), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 9], 4, -640364487), f, r, d[n + 12], 11, -421815835), m, f, d[n + 15], 16, 530742520), i, m, d[n + 2], 23, -995338651), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 0], 6, -198630844), f, r, d[n + 7], 10, 1126891415), m, f, d[n + 14], 15, -1416354905), i, m, d[n + 5], 21, -57434055), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 12], 6, 1700485571), f, r, d[n + 3], 10, -1894986606), m, f, d[n + 10], 15, -1051523), i, m, d[n + 1], 21, -2054922799), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 8], 6, 1873313359), f, r, d[n + 15], 10, -30611744), m, f, d[n + 6], 15, -1560198380), i, m, d[n + 13], 21, 1309151649), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 4], 6, -145523070), f, r, d[n + 11], 10, -1120210379), m, f, d[n + 2], 15, 718787259), i, m, d[n + 9], 21, -343485551), m = safe_add(m, h), f = safe_add(f, t), r = safe_add(r, g), i = safe_add(i, e) } return Array(m, f, r, i) } function md5_cmn(d, _, m, f, r, i) { return safe_add(bit_rol(safe_add(safe_add(_, d), safe_add(f, i)), r), m) } function md5_ff(d, _, m, f, r, i, n) { return md5_cmn(_ & m | ~_ & f, d, _, r, i, n) } function md5_gg(d, _, m, f, r, i, n) { return md5_cmn(_ & f | m & ~f, d, _, r, i, n) } function md5_hh(d, _, m, f, r, i, n) { return md5_cmn(_ ^ m ^ f, d, _, r, i, n) } function md5_ii(d, _, m, f, r, i, n) { return md5_cmn(m ^ (_ | ~f), d, _, r, i, n) } function safe_add(d, _) { var m = (65535 & d) + (65535 & _); return (d >> 16) + (_ >> 16) + (m >> 16) << 16 | 65535 & m } function bit_rol(d, _) { return d << _ | d >>> 32 - _ }
//var ayuBase = 'http://127.0.0.1:5000'
var ayuBase = 'https://connectmedia.rs'
var ayuStats = []
var cooldowns = {}
var ayuRetry = 0

console.debug('Ayu tracker imported!')
loadAyu()

function loadAyu() {
    var targets = document.querySelectorAll('div[data-ayu-widget]')
    targets.forEach((target) => {
        if (target !== undefined && target !== null) {
            console.debug('Ayu widget space found!')
            let widgetId = target.dataset["ayuWidget"]
            if (widgetId !== undefined) {
                let widgetUri = `${ayuBase}/api/v1/widget/${widgetId}/render?uid=${signature()}`
                const originId = (new URLSearchParams(window.location.search)).get('ayu_origin')
                if (originId) {
                    widgetUri = `${widgetUri}&org=${originId}`
                }
                fetch(widgetUri).then((resp) => {
                    if (resp.status === 200) {
                        resp.text().then((body) => {
                            target.innerHTML = body
                            console.debug(`Ayu widget contents injected for widget #${widgetId}!`)
                            injectEvents()
                            ayuEvalBodyScripts()
                        })
                    }
                })
            }
        } else {
            if (ayuRetry <= 10) {
                console.debug('Ayu widget space not found, trying again in 2s...')
                setTimeout(() => {
                    loadAyu()
                }, 2000)
            } else {
                console.debug('Ayu tried too many times, shutting down.')
            }
        }
    })
}

function ayuEvalBodyScripts() {
    let scripts = document.querySelectorAll('.ayuWidget script')
    scripts.forEach((elm) => {
        if (elm.textContent) {
            try {
                eval(elm.textContent)
            } catch {
                console.debug('Ayu tried to execute a Type 1 script, but failed.')
            }
        }
        if (elm.attributes['src']) {
            fetch(elm.attributes['src'].value).then((resp) => {
                resp.text().then((body) => {
                    try {
                        eval(body)
                    } catch {
                        console.debug('Ayu tried to execute a Type 2 script, but failed.')
                    }
                })
            })
        }
    })
}

function findTarget(elm) {
    let target = null
    let currElm = elm
    while (target === null) {
        if (currElm.classList.contains('ayuPost')) {
            target = currElm
        } else {
            currElm = currElm.parentNode
        }
    }
    return target
}

function debounce(func, timeout = 300){
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }

function cooling(post, event) {
    let key = `${event}-${post}`
    let now = Date.now()
    let stamp = cooldowns[key] ? cooldowns[key] : 0
    if (now > stamp + 1500) {
        cooldowns[key] = now
        return false
    } else {
        return true
    }
}

function signature() {
    const windowObj = window || global;
    const windowObjCount = _ => {
        const keys = [];
        for (let i in windowObj) {
            keys.push(i)
        }
        return keys.length.toString(36);
    }
    const pad = (str, size) => {
        return (new Array(size + 1).join('0') + str).slice(-size);
    };
    const navi = navigator.userAgent.length.toString(36);
    const padString = pad(navi + windowObjCount(), 4);
    const width = windowObj.screen.width.toString(36)
    const height = windowObj.screen.height.toString(36)
    const availWidth = windowObj.screen.availWidth.toString(36)
    const availHeight = windowObj.screen.availHeight.toString(36)
    const colorDepth = windowObj.screen.colorDepth.toString(36)
    const pixelDepth = windowObj.screen.pixelDepth.toString(36)
    return MD5(padString + width + height + availWidth + availHeight + colorDepth + pixelDepth);
}

function newStat(widget, post, event) {
    return {
        user: signature(),
        widget: parseInt(widget),
        kind: event,
        post: parseInt(post)
    }
}

function statExists(pid, kind) {
    let exists = false
    ayuStats.forEach((stat) => {
        if (!exists) {
            if (stat.post === pid && stat.kind === kind) {
                exists = true
            }
        }
    })
    return exists
}

function trackClick(ev) {
    let trackTarget = findTarget(ev.target)
    if (trackTarget) {
        let kind = 'click'
        let postId = trackTarget.dataset['ayuPost']
        let postUrl = trackTarget.dataset['ayuLink']
        let widgetId = findWidgetId(trackTarget)
        if (!cooling(postId, kind)) {
            if (!statExists(postId, kind)) {
                console.debug(`Ayu ${kind} tracking event recorded for post #${postId}.`)
                ayuStats.push(newStat(widgetId, postId, kind))
                let win = window.open(postUrl, '_blank')
                win.focus()
                submitEvents()
            }
        }
    }
}

function findWidgetId(target) {
    let current = target
    let widgetId = undefined
    while (widgetId === undefined) {
        current = current.parentNode
        widgetId = current.dataset['ayuWidget']
    }
    return widgetId
}

function trackView(ev) {
    let trackTarget = findTarget(ev.target)
    if (trackTarget) {
        let kind = 'view'
        let postId = trackTarget.dataset['ayuPost']
        let widgetId = findWidgetId(trackTarget)
        if (!cooling(postId, kind)) {
            if (!statExists(postId, kind)) {
                console.debug(`Ayu view tracking event recorded for post #${postId}.`)
                ayuStats.push(newStat(widgetId, postId, kind))
                debounce(() => {submitEvents()}, 500)
            }
        }
    }
}

function injectClickEvents() {
    console.debug('Injected Ayu click event tracking.')
    let maps = document.querySelectorAll('.ayuPost')
    maps.forEach((map) => {
        map.addEventListener('click', trackClick)
    })
}

function injectViewEvents() {
    console.debug('Injected Ayu view event tracking.')
    let maps = document.querySelectorAll('.ayuPost')
    let observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting === true) {
                trackView(entry)
            }
        })
    }, {threshold: [0]})
    maps.forEach((map) => {
        observer.observe(map)
    })
}

function injectEvents() {
    injectClickEvents()
    injectViewEvents()
}

function submitEvents(callback = null) {
    let statsCopy = JSON.parse(JSON.stringify(ayuStats))
    ayuStats = []
    let widgetStats = {}
    statsCopy.forEach((stat) => {
        let pool = widgetStats[stat.widget] || []
        pool.push(stat)
        widgetStats[stat.widget] = pool
    })
    for (let widgetId in widgetStats) {
        fetch(`${ayuBase}/api/v1/widget/${widgetId}/track`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                events: widgetStats[widgetId],
                origin: window.location.origin
            })
        }).then((resp) => {
                if (resp.status === 201) {
                    console.debug('Ayu stat submission succeeded.')
                } else {
                    console.debug('Ayu stat submission failed!')
                }
                if (callback !== null) {
                    callback()
                }
            })
    }
}

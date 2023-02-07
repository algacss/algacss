const execute = require('../execute.js')

test('Testing card or box component', async () => {
  const input = '@use card;'
  const output = `.card {
    display: flex;
    flex-direction: column
}
.card, .box {
    width: 100%;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid #d9d9d9;
    border-radius: 0.25rem;
    word-wrap: break-word
}
.card > *:first-child {
    border-top-right-radius: 0.25rem;
    border-top-left-radius: 0.25rem
}
.card > *:last-child {
    border-bottom-right-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem
}
.cardHeader, .cardFooter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem
}
.cardHeader {
    border-bottom: 1px solid #d9d9d9
}
.cardFooter {
    border-top: 1px solid #d9d9d9
}
.cardBody {
    flex: 1 1 auto
}
.box, .cardBody {
    padding: 1rem
}
.cardImage {
    width: 100%
}
@media (prefers-color-scheme: dark) {
    .card, .box {
        background-color: #2f2f2f;
        border-color: #5f5f5f
    }
    .cardHeader {
        border-bottom-color: #5f5f5f
    }
    .cardFooter {
        border-top-color: #5f5f5f
    }
}
@media (prefers-color-scheme: light) {
    html[data-mode=dark] .card, html[data-mode=dark] .box {
        background-color: #2f2f2f;
        border-color: #5f5f5f
    }
    html[data-mode=dark] .cardHeader {
        border-bottom-color: #5f5f5f
    }
    html[data-mode=dark] .cardFooter {
        border-top-color: #5f5f5f
    }
}
@media (prefers-color-scheme: dark) {
    html[data-mode=light] .card, html[data-mode=light] .box {
        background-color: #fff;
        border-color: #d9d9d9
    }
    html[data-mode=light] .cardHeader {
        border-bottom-color: #d9d9d9
    }
    html[data-mode=light] .cardFooter {
        border-top-color: #d9d9d9
    }
}
@media print {
    .card, .box {
        border: none
    }
    .cardHeader, .cardFooter {
        display: none
    }
}`
  await execute(input, output, {log: false, file: './examples/card/card.css'})
})

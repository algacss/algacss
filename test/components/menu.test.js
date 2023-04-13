const execute = require('../execute.js')

test('Testing menu component', async () => {
  const input = '@use menu;'
  const output = `.nav, .menu {
    display: flex;
    flex-wrap: wrap;
    padding-left: 0;
    padding-right: 0;
    margin: 0;
    list-style: none
}
.menu {
    flex-direction: column
}
.nav > .item > .link, .menu > .item > .link {
    display: block;
    padding: 0.675rem 1rem;
    border-radius: 0.25rem;
    color: #2f2f2f;
    text-decoration: none;
    cursor: default;
    transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out
}
.nav > .item:hover > .link, .menu > .item:hover > .link {
    background-color: #ededed
}
.nav > .item.active > .link, .menu > .item.active > .link {
    background-color: #07f;
    color: #fff
}
.menu > .item > .link {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem
}
.nav.fill > .item {
    flex: 1 1 auto;
    text-align: center
}
.nav.custom > .item > .link {
    border-top: 2px solid transparent;
    border-bottom: 4px solid transparent
}
.menu.custom > .item > .link {
    border-right: 2px solid transparent;
    border-left: 4px solid transparent
}
.nav.custom > .item:not(.active):hover > .link {
    border-bottom-color: #7d8ca4;
    background-color: #f1f2f3;
    color: #363d46
}
.nav.custom > .item.active > .link {
    border-bottom-color: #07f;
    background-color: #ebf4ff;
    color: #07f
}
.menu.custom > .item:not(.active):hover > .link {
    border-left-color: #7d8ca4;
    background-color: #f6f8f9;
    color: #363d46
}
.menu.custom > .item.active > .link {
    border-left-color: #07f;
    background-color: #ebf4ff;
    color: #07f
}
.nav.tab {
    border-bottom: 1px solid #dee2e6
}
.nav.tab > .item > .link {
    border-radius: 0px;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    background-color: transparent;
    border: 1px solid transparent;
    margin-bottom: -1px
}
.nav.tab > .item:not(.active):hover > .link {
    background-color: #ededed
}
.nav.tab > .item.active > .link {
    color: inherit;
    background-color: #fff;
    border-color: #dee2e6 #dee2e6 transparent
}
@media (prefers-color-scheme: dark) {
    .nav > .item > .link, .menu > .item > .link {
        color: inherit
    }
    .nav > .item:hover > .link, .menu > .item:hover > .link {
        background-color: #5f5f5f
    }
    .nav.custom > .item:not(.active):hover > .link {
        background-color: #2f2f2f;
        color: inherit
    }
    .nav.custom > .item.active > .link {
        background-color: #2f2f2f
    }
    .menu.custom > .item:not(.active):hover > .link {
        background-color: #2f2f2f;
        color: inherit
    }
    .menu.custom > .item.active > .link {
        background-color: #2f2f2f
    }
    .nav.tab {
        border-bottom-color: #5f5f5f
    }
    .nav.tab > .item:not(.active):hover > .link {
        background-color: #5f5f5f
    }
    .nav.tab > .item.active > .link {
        background-color: #2f2f2f;
        border-color: #5f5f5f #5f5f5f transparent
    }
}
@media (prefers-color-scheme: light) {
    html[data-mode=dark] .nav > .item > .link, html[data-mode=dark] .menu > .item > .link {
        color: inherit
    }
    html[data-mode=dark] .nav > .item:hover > .link, html[data-mode=dark] .menu > .item:hover > .link {
        background-color: #5f5f5f
    }
    html[data-mode=dark] .nav.custom > .item:not(.active):hover > .link {
        background-color: #2f2f2f;
        color: inherit
    }
    html[data-mode=dark] .nav.custom > .item.active > .link {
        background-color: #2f2f2f
    }
    html[data-mode=dark] .menu.custom > .item:not(.active):hover > .link {
        background-color: #2f2f2f;
        color: inherit
    }
    html[data-mode=dark] .menu.custom > .item.active > .link {
        background-color: #2f2f2f
    }
    html[data-mode=dark] .nav.tab {
        border-bottom-color: #5f5f5f
    }
    html[data-mode=dark] .nav.tab > .item:not(.active):hover > .link {
        background-color: #5f5f5f
    }
    html[data-mode=dark] .nav.tab > .item.active > .link {
        background-color: #2f2f2f;
        border-color: #5f5f5f #5f5f5f transparent
    }
}
@media (prefers-color-scheme: dark) {
    html[data-mode=light] .nav > .item > .link, html[data-mode=light] .menu > .item > .link {
        color: #2f2f2f
    }
    html[data-mode=light] .nav > .item:hover > .link, html[data-mode=light] .menu > .item:hover > .link {
        background-color: #ededed
    }
    html[data-mode=light] .nav.custom > .item:not(.active):hover > .link {
        background-color: #f6f8f9;
        color: #363d46
    }
    html[data-mode=light] .nav.custom > .item.active > .link {
        background-color: #ebf4ff
    }
    html[data-mode=light] .menu.custom > .item:not(.active):hover > .link {
        background-color: #f6f8f9;
        color: #363d46
    }
    html[data-mode=light] .menu.custom > .item.active > .link {
        background-color: #ebf4ff
    }
    html[data-mode=light] .nav.tab {
        border-bottom-color: #dee2e6
    }
    html[data-mode=light] .nav.tab > .item:not(.active):hover > .link {
        background-color: #ededed
    }
    html[data-mode=light] .nav.tab > .item.active > .link {
        background-color: #fff;
        border-color: #dee2e6 #dee2e6 transparent
    }
}`
  await execute(input, output, {log: false, file: './examples/menu/menu.css'})
})

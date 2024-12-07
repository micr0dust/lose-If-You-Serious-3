window.onload = function () {
    
    document.addEventListener(
        'contextmenu',
        function (e) {
            e.preventDefault();
        }, false
    );

    document.addEventListener(
        'keydown',
        function (e) {
            const key = e.key.toLowerCase();
            if (e.ctrlKey && e.shiftKey && key === 'i')
                disabledEvent(e);
            if (e.ctrlKey && e.shiftKey && key === 'j')
                disabledEvent(e);
            if (key === 's' && (isMac() ? e.metaKey : e.ctrlKey))
                disabledEvent(e);
            if (e.ctrlKey && key === 'u')
                disabledEvent(e);
            if (key === 'f12')
                disabledEvent(e);
        }, false
    );

    function disabledEvent (e) {
        if (e.stopPropagation)
            e.stopPropagation();
        e.preventDefault();
        return false;
    }

    function isMac() {
        return /Mac|iPod|iPhone|iPad/.test(navigator.userAgent);
    }
}
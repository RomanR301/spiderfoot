let langToggle = document.querySelector('.lang-select-wrapper') !== null;
if (langToggle) {
    (document).querySelector('.lang-select-wrapper').addEventListener('click', function() {
        this.querySelector('.lang-select').classList.toggle('open');
        for (const option of document.querySelectorAll(".lang-option")) {
            option.addEventListener('click', function() {

                if (!this.classList.contains('selected')) {
                    this.parentNode.querySelector('.lang-option.selected').classList.remove('selected');
                    this.classList.add('selected');
                    this.closest('.lang-select').querySelector('.lang-select__trigger span').textContent = this.textContent;
                }
            })
        }
        window.addEventListener('click', function(e) {
            const select1 = document.querySelector('.lang-select')
            if (!select1.contains(e.target)) {
                select1.classList.remove('open');
            }
        });
    })
}
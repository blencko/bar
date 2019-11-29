import { Directive, ElementRef, OnInit, AfterViewInit, Input } from '@angular/core';
declare var $: any;

@Directive({
  selector: '[appDropify]'
})
export class DropifyDirective implements OnInit, AfterViewInit {

  @Input() defaultFile: any;

  constructor(
    private el: ElementRef
  ) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    if (this.defaultFile) {
      $(this.el.nativeElement).dropify({
        defaultFile: this.defaultFile,
        error: {
          'fileSize': 'O tamanho do arquivo é muito grande ({{ value }} max).',
          'minWidth': 'A largura da imagem é muito pequena ({{ value }}}px min).',
          'maxWidth': 'A largura da imagem é muito grande ({{ value }}}px max).',
          'minHeight': 'A altura da imagem é muito pequena ({{ value }}}px min).',
          'maxHeight': 'A altura da imagem é muito grande ({{ value }}px max).',
          'imageFormat': 'O formato da imagem não é permitido ({{ value }} só).'
        }
      });
    } else {
      setTimeout(() => {
        $(this.el.nativeElement).dropify({
          error: {
            'fileSize': 'O tamanho do arquivo é muito grande ({{ value }} max).',
            'minWidth': 'A largura da imagem é muito pequena ({{ value }}}px min).',
            'maxWidth': 'A largura da imagem é muito grande ({{ value }}}px max).',
            'minHeight': 'A altura da imagem é muito pequena ({{ value }}}px min).',
            'maxHeight': 'A altura da imagem é muito grande ({{ value }}px max).',
            'imageFormat': 'O formato da imagem não é permitido ({{ value }} só).'
          }
        });
      }, 800);
    }
  }

}

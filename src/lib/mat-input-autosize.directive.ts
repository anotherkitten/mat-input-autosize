import {AfterContentInit, AfterViewInit, ContentChild, Directive, ElementRef, Input, OnDestroy} from '@angular/core';
import {NgModel} from '@angular/forms';
import {MatInput} from '@angular/material/input';

import {Subscription} from 'rxjs';

@Directive({
    selector: '[matInputAutosize]'
})
export class MatInputAutosizeDirective implements AfterViewInit, AfterContentInit, OnDestroy {
    element: ElementRef;
    hiddenText: Text;
    changeDetectSub: Subscription;

    @Input() matInputAutosizeMaxWidth;
    @Input() matInputAutosizeMinWidth = '120px';
    @ContentChild(NgModel) childNgModel: NgModel;
    @ContentChild(MatInput) childMatInput: MatInput;

    constructor(el: ElementRef) {
        this.element = el;
    }

    ngAfterViewInit() {
        let el = this.element.nativeElement;

        if (!(el instanceof HTMLInputElement)) {
            throw new Error('matInputAutosize directive must be on an input element');
        }

        while (el.nodeName.toUpperCase() !== 'MAT-FORM-FIELD') {
            if (!el.parentNode) {
                throw new Error('Element with matInputAutosize directive must be within a mat-form-field');
            }

            el = el.parentNode;
        }

        const relativeContainer = document.createElement('div');
        Object.assign(relativeContainer.style, {
            'position': 'relative',
            'display': 'inline-block',
            'max-width': this.matInputAutosizeMaxWidth || null,
            'min-width': this.matInputAutosizeMinWidth,
            'min-height': '57px',
            'visibility': 'hidden',
            'white-space': 'pre'
        });
        el.parentNode.prepend(relativeContainer);

        this.hiddenText = document.createTextNode(' ');
        relativeContainer.appendChild(this.hiddenText);

        Object.assign(el.style, {
            'position': 'absolute',
            'left': '0',
            'width': '100%',
            'visibility': 'visible'
        });
        relativeContainer.appendChild(el);
    }

    ngAfterContentInit() {
        if (!this.childMatInput) {
            throw new Error('Element with matInputAutosize directive must also have the matInput directive');
        }

        if (this.childNgModel) {
            this.changeDetectSub = this.childNgModel.control.valueChanges.subscribe(this.changeHiddenText);
        } else {
            this.element.nativeElement.addEventListener('input', () => this.changeHiddenText(this.element.nativeElement.value));
        }
    }

    ngOnDestroy() {
        if (this.changeDetectSub) {
            this.changeDetectSub.unsubscribe();
        }
    }

    changeHiddenText = (newValue: string) => {
        if (this.hiddenText) {
            this.hiddenText.data = newValue + ' ';
        }
    }
}
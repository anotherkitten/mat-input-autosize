import {
	AfterViewInit,
	Directive,
	ElementRef,
	Input,
	OnDestroy,
	Optional,
	Self
} from '@angular/core';
import {NgModel} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {Subscription} from 'rxjs';

@Directive({
    selector: '[matInputAutosize]'
})
export class MatInputAutosizeDirective implements AfterViewInit, OnDestroy {
    inputElement: HTMLInputElement;
    hiddenText: Text;
    changeDetectSub: Subscription;

    @Input() matInputAutosizeMaxWidth;
    @Input() matInputAutosizeMinWidth = '120px';
    @Input() matInputAutosizeFontStyle;

    constructor(el: ElementRef<HTMLInputElement>,
				@Self() private childMatInput: MatInput,
				@Optional() @Self() private childNgModel: NgModel) {
		this.inputElement = el.nativeElement;
    }

    ngAfterViewInit() {
		this.checkErrors();
		this.overwriteParentWidth();
		this.createHiddenTextContainer();
		this.setOwnStyles();
		this.subscribeToChanges();
    }

    ngOnDestroy() {
        if (this.changeDetectSub) {
            this.changeDetectSub.unsubscribe();
        }
    }

    checkErrors() {
		if (!(this.inputElement instanceof HTMLInputElement)) {
            throw new Error('matInputAutosize directive must be on an input element');
        }
		
        if (!this.childMatInput) {
            throw new Error('Element with matInputAutosize directive must also have the matInput directive');
        }
    }
	
	overwriteParentWidth() {
		Object.assign((this.inputElement.parentNode as HTMLElement).style, {'width': '100%'});
	}
	
	createHiddenTextContainer() {
		const textContainer = document.createElement('div');
        Object.assign(textContainer.style, {
            'display': 'inline-block',
            'max-width': this.matInputAutosizeMaxWidth || null,
            'min-width': this.matInputAutosizeMinWidth,
			'font': this.matInputAutosizeFontStyle || null,
            'visibility': 'hidden',
            'white-space': 'pre'
        });
        this.inputElement.parentNode.appendChild(textContainer);

        this.hiddenText = document.createTextNode(' ');
        textContainer.appendChild(this.hiddenText);
	}
	
	setOwnStyles() {
		Object.assign(this.inputElement.style, {
            'position': 'absolute',
            'left': '0'
        });
	}
	
	subscribeToChanges() {
        if (this.childNgModel) {
            this.changeDetectSub = this.childNgModel.control.valueChanges.subscribe(this.changeHiddenText);
        } else {
            this.inputElement.addEventListener('input', () => this.changeHiddenText(this.inputElement.value));
        }
	}

    changeHiddenText = (newValue: string) => {
        if (this.hiddenText) {
            this.hiddenText.data = newValue + ' ';
        }
    }
}
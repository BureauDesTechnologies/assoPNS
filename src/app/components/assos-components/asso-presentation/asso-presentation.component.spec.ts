import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {AssoPresentationComponent} from "./asso-presentation.component";

describe('AssoPresentationComponent', () => {
    let component: AssoPresentationComponent;
    let fixture: ComponentFixture<AssoPresentationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AssoPresentationComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AssoPresentationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

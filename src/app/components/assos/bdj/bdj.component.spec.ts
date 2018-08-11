import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {BdjComponent} from "./bdj.component";

describe('BdjComponent', () => {
    let component: BdjComponent;
    let fixture: ComponentFixture<BdjComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BdjComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BdjComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

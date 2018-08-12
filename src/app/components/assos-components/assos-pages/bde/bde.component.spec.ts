import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {BdeComponent} from "./bde.component";

describe('BdeComponent', () => {
    let component: BdeComponent;
    let fixture: ComponentFixture<BdeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BdeComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BdeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

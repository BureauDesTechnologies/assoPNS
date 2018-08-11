import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {BdcComponent} from "./bdc.component";

describe('BdcComponent', () => {
    let component: BdcComponent;
    let fixture: ComponentFixture<BdcComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BdcComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BdcComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

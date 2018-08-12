import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {BdhComponent} from "./bdh.component";

describe('BdhComponent', () => {
    let component: BdhComponent;
    let fixture: ComponentFixture<BdhComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BdhComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BdhComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

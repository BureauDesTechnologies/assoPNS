import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {GiveRightsComponent} from "./give-rights.component";

describe('GiveRightsComponent', () => {
    let component: GiveRightsComponent;
    let fixture: ComponentFixture<GiveRightsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GiveRightsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GiveRightsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

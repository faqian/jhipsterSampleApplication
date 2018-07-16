/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { TrainUserDetailComponent } from 'app/entities/train-user/train-user-detail.component';
import { TrainUser } from 'app/shared/model/train-user.model';

describe('Component Tests', () => {
    describe('TrainUser Management Detail Component', () => {
        let comp: TrainUserDetailComponent;
        let fixture: ComponentFixture<TrainUserDetailComponent>;
        const route = ({ data: of({ trainUser: new TrainUser(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [TrainUserDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TrainUserDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TrainUserDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.trainUser).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});

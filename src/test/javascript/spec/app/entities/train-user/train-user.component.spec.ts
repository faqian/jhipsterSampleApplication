/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { TrainUserComponent } from 'app/entities/train-user/train-user.component';
import { TrainUserService } from 'app/entities/train-user/train-user.service';
import { TrainUser } from 'app/shared/model/train-user.model';

describe('Component Tests', () => {
    describe('TrainUser Management Component', () => {
        let comp: TrainUserComponent;
        let fixture: ComponentFixture<TrainUserComponent>;
        let service: TrainUserService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [TrainUserComponent],
                providers: []
            })
                .overrideTemplate(TrainUserComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TrainUserComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TrainUserService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new TrainUser(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.trainUsers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});

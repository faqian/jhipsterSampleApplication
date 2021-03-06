/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { TrainUserUpdateComponent } from 'app/entities/train-user/train-user-update.component';
import { TrainUserService } from 'app/entities/train-user/train-user.service';
import { TrainUser } from 'app/shared/model/train-user.model';

describe('Component Tests', () => {
    describe('TrainUser Management Update Component', () => {
        let comp: TrainUserUpdateComponent;
        let fixture: ComponentFixture<TrainUserUpdateComponent>;
        let service: TrainUserService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [TrainUserUpdateComponent]
            })
                .overrideTemplate(TrainUserUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TrainUserUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TrainUserService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TrainUser(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.trainUser = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TrainUser();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.trainUser = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});

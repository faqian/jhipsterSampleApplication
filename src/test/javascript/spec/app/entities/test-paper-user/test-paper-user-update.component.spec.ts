/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { TestPaperUserUpdateComponent } from 'app/entities/test-paper-user/test-paper-user-update.component';
import { TestPaperUserService } from 'app/entities/test-paper-user/test-paper-user.service';
import { TestPaperUser } from 'app/shared/model/test-paper-user.model';

describe('Component Tests', () => {
    describe('TestPaperUser Management Update Component', () => {
        let comp: TestPaperUserUpdateComponent;
        let fixture: ComponentFixture<TestPaperUserUpdateComponent>;
        let service: TestPaperUserService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [TestPaperUserUpdateComponent]
            })
                .overrideTemplate(TestPaperUserUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TestPaperUserUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TestPaperUserService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TestPaperUser(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.testPaperUser = entity;
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
                    const entity = new TestPaperUser();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.testPaperUser = entity;
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

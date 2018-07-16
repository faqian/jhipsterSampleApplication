/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { TestPaperUpdateComponent } from 'app/entities/test-paper/test-paper-update.component';
import { TestPaperService } from 'app/entities/test-paper/test-paper.service';
import { TestPaper } from 'app/shared/model/test-paper.model';

describe('Component Tests', () => {
    describe('TestPaper Management Update Component', () => {
        let comp: TestPaperUpdateComponent;
        let fixture: ComponentFixture<TestPaperUpdateComponent>;
        let service: TestPaperService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [TestPaperUpdateComponent]
            })
                .overrideTemplate(TestPaperUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TestPaperUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TestPaperService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TestPaper(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.testPaper = entity;
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
                    const entity = new TestPaper();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.testPaper = entity;
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

import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { environment } from '../../environments/environment';
import { testProviders } from '../../testing/test-providers';
import { SettingService, SettingType } from './setting.service';

describe('SettingService', () => {
  const api = `${environment.apiUrl}/api`;
  let service: SettingService;
  let backend: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: testProviders });
    service = TestBed.inject(SettingService);
    backend = TestBed.inject(HttpTestingController);
  });

  afterEach(() => backend.verify());

  it('picks the list service by setting type', () => {
    expect(service.forType(SettingType.INSTITUTION)).toBe(service.institutions);
    expect(service.forType(SettingType.CAMPAIGN)).toBe(service.campaigns);
    expect(service.forType(SettingType.METHOD)).toBe(service.methods);
    expect(service.forType(SettingType.PROGRAM)).toBe(service.programs);
    expect(service.forType(SettingType.COWORKER)).toBe(service.coworkers);
    expect(service.forType(SettingType.EVENT)).toBe(service.events);
    expect(service.forType(99)).toBeUndefined();
  });

  it('calls the backend list endpoint of each setting', () => {
    const lists: ['campaigns' | 'coworkers' | 'events' | 'institutions' | 'methods' | 'programs', string][] = [
      ['campaigns', 'campaign/allCampaigns'], ['coworkers', 'coworker/allCoworkers'], ['events', 'event/allEvents'],
      ['institutions', 'institution/allInstitutions'], ['methods', 'method/allMethods'], ['programs', 'program/allPrograms']
    ];
    for (const [name, path] of lists) {
      service[name].getAll().subscribe();
      backend.expectOne({ method: 'GET', url: `${api}/${path}` }).flush([]);
    }
  });

  it('saves, loads and deletes one item through the CRUD endpoints', () => {
    const item = { id: '7', name: 'Rozhovor', description: '' };

    service.methods.save(item).subscribe();
    const save = backend.expectOne({ method: 'POST', url: `${api}/method/save` });
    expect(save.request.body).toEqual(item);
    save.flush(item);

    service.methods.get('7').subscribe(loaded => expect(loaded).toEqual(item));
    backend.expectOne({ method: 'GET', url: `${api}/method/7` }).flush(item);

    service.methods.delete('7').subscribe();
    backend.expectOne({ method: 'DELETE', url: `${api}/method/7` }).flush(null);
  });
});

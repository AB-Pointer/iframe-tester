const sites = [
    { url: '', name: 'Select site' },
    { url: 'https://unity-qa.powerfleet.com/FLEET/connect.aspx', name: 'QA' },
    { url: 'https://unity-dev.powerfleet.com/FLEET/connect.aspx', name: 'DEV' },
    { url: 'http://localhost/FLEET/connect.aspx', name: 'Local IIS http' },
    { url: 'https://localhost/FLEET/connect.aspx', name: 'Local IIS https' },
    { url: 'http://localhost:3001', name: 'Local React http' }
];

const pages = [
    { path: '/fleet', name: 'Fleet' },
    { path: '/messages', name: 'Messages' },
    { path: '/settings/events', name: 'Events settings' },
    { path: '/reports/available', name: 'Available reports' },
    { path: '/reports/scheduled', name: 'Scheduled reports' },
    { path: '/powerBi', name: 'Power BI' },
    { path: '/safety', name: 'Safety' },
    { path: '/safety/accidents', name: 'Safety accidents' },
    { path: '/settings/geofences_poi', name: 'Settings Geo & POI' },
    { path: '/settings/shifts', name: 'Settings shifts' },
    { path: '/settings/monitoring/fields', name: 'Settings monitoring fields' },
    { path: '/settings/custom_fields', name: 'Settings custom fields' },
    { path: '/settings/viewer_accounts', name: 'Settings viewer accounts' },
    { path: '/settings/resources', name: 'Settings resources' },
    { path: '/settings/menu', name: 'Settings menu' },
    { path: '/admin/account', name: 'Admin account' },
    { path: '/admin/vehicle', name: 'Admin vehicle' },
    { path: '/admin/report', name: 'Admin report' },
    { path: '/admin/group', name: 'Admin group' },
    { path: '/admin/drivers', name: 'Admin drivers' },
    { path: '/admin/users', name: 'Admin users' },
    { path: '/admin/indications', name: 'Admin indications' },
    { path: '/admin/caniq', name: 'Admin CANIQ' },
    { path: '/share_resource', name: 'Share resource' },
    { path: '/pf_safety', name: 'Powerfleet Safety' },
    { path: '/pf_safety/dashboard', name: 'Powerfleet Safety dashboard' },
    { path: '/pf_safety/incidents', name: 'Powerfleet Safety incidents' },
    { path: '/pf_safety/drivers', name: 'Powerfleet Safety drivers' },
    { path: '/pf_sustainability/home', name: 'Powerfleet Sustainability' },
];

const languages = [
    { id: 1, name: 'English' },
    { id: 3, name: 'Spanish' },
    { id: 7, name: 'Portuguese' },
    { id: 8, name: 'English (South Africa)' },
    { id: 15, name: 'German - PREVIEW' },
    { id: 16, name: 'Chinese (Mandarin) - PREVIEW' },
    { id: 99, name: 'English (TSP- with ElementId)' }
];

const appConfig = {
    sites,
    pages,
    languages
};

global.appConfig = appConfig;

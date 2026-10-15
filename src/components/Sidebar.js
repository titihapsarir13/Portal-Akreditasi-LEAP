import React from 'react';

const IKON = {
  dashboard: '▦', alur: '🗺️', admin: '⚙️', tugas: '◧', naskah: '✎', form: '▤', siklus: '◷', log: '◉',
  edlk: '◩', dokumen: '▣', eklk: '◆', proses: '➚', ref: '§'
};

export default function Sidebar({ app, modul, aktif, onPilih, drawer, collapsed, isSA, onTutup }) {
  const grup = {};
  modul.forEach((m) => { (grup[m.grup || 'Lainnya'] = grup[m.grup || 'Lainnya'] || []).push(m); });
  const urutGrup = ['Pengisian', 'Referensi', 'Lainnya'].filter((g) => grup[g]);

  return (
    <aside className={'side' + (drawer ? ' drawer' : '') + (collapsed ? ' collapsed' : '')}>
      <div className="brand">
        <div className="logo">LM</div>
        {!collapsed && <div className="brand-t"><b>{(app && app.namaApp) || 'Portal Mutu LEAP'}</b><small>Checklist Akreditasi</small></div>}
        {drawer && <button className="xdraw" onClick={onTutup} aria-label="Tutup">✕</button>}
      </div>
      <nav className="nav">
        <div className="ng">Ringkasan</div>
        <Item id="dashboard" ikon={IKON.dashboard} label="Dashboard" aktif={aktif} onPilih={onPilih} collapsed={collapsed} />
        <Item id="alur" ikon={IKON.alur} label="Alur Kerja (peta)" aktif={aktif} onPilih={onPilih} collapsed={collapsed} />
        {urutGrup.map((g) => (
          <React.Fragment key={g}>
            <div className="ng">{g}</div>
            {grup[g].map((m) => (
              <Item key={m.id} id={'modul-' + m.id} ikon={IKON[m.ikon] || '•'} label={m.nama}
                badge={m._jml} lock={m.terkunci} aktif={aktif} onPilih={onPilih} collapsed={collapsed} />
            ))}
          </React.Fragment>
        ))}
        {isSA && (
          <React.Fragment>
            <div className="ng">Administrasi</div>
            <Item id="admin" ikon={IKON.admin} label="Admin & Akses" aktif={aktif} onPilih={onPilih} collapsed={collapsed} />
          </React.Fragment>
        )}
      </nav>
      {!collapsed && <div className="sfoot">v{(app && app.versiKode) || '2.0.0'} · tersambung ke Spreadsheet</div>}
    </aside>
  );
}

function Item({ id, ikon, label, badge, lock, aktif, onPilih, collapsed }) {
  return (
    <div className={'ni' + (aktif === id ? ' act' : '')} onClick={() => onPilih(id)} title={collapsed ? label : ''}>
      <span className="ic">{ikon}</span>
      {!collapsed && <span className="ni-l">{lock ? '🔒 ' : ''}{label}</span>}
      {!collapsed && badge != null && <span className="bdg">{badge}</span>}
    </div>
  );
}

import React from 'react';

// Pemetaan modul ke 5 fase alur kerja
const FASE = [
  { no: '0', nama: 'Keputusan & Verifikasi', modul: ['tugas'] },
  { no: '1', nama: 'Perbaikan Naskah SPMI', modul: ['naskah', 'form'] },
  { no: '2', nama: 'Siklus Mutu Berjalan', modul: ['siklus', 'log'] },
  { no: '3', nama: 'Pengisian EDLK & EKLK', modul: ['edlk', 'dokumen', 'eklk_bim', 'eklk_ket'] },
  { no: '4', nama: 'Menuju Akreditasi', modul: ['proses'] }
];

export default function AlurMap({ modul, onPilih }) {
  const byId = {};
  modul.forEach((m) => { byId[m.id] = m; });

  return (
    <div className="body">
      <div className="panel" style={{ marginBottom: 14 }}>
        <div className="ph">Alur kerja garis besar <span className="mt">klik kotak untuk membuka modulnya</span></div>
        <div className="pb">
          <div className="map">
            {FASE.map((f, i) => (
              <React.Fragment key={f.no}>
                <div className="fase">
                  <div className="fase-h"><span className="fase-no">{f.no}</span> {f.nama}</div>
                  <div className="fase-nodes">
                    {f.modul.map((id) => {
                      const m = byId[id];
                      if (!m) return null;
                      const pct = m.progres ? m.progres.pct : 0;
                      const warna = pct >= 80 ? 'n-g' : pct >= 40 ? 'n-a' : 'n-r';
                      return (
                        <button key={id} className={'node ' + warna + (m.terkunci ? ' terkunci' : '')}
                          onClick={() => onPilih('modul-' + id)} title={m.terkunci ? 'Prasyarat belum cukup' : 'Buka ' + m.nama}>
                          <div className="node-nama">{m.terkunci ? '🔒 ' : ''}{m.nama}</div>
                          <div className="node-bar"><i style={{ width: pct + '%' }} /></div>
                          <div className="node-pct">{pct}%{m.progres ? `  ·  ${m.progres.selesai}/${m.progres.total}` : ''}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
                {i < FASE.length - 1 && <div className="panah">▶</div>}
              </React.Fragment>
            ))}
          </div>
          <div className="map-ket">
            <span><i className="dotn n-g" /> ≥80% siap</span>
            <span><i className="dotn n-a" /> 40–79%</span>
            <span><i className="dotn n-r" /> &lt;40%</span>
            <span>🔒 terkunci (prasyarat belum cukup) — kunci lunak, SA dapat membuka</span>
          </div>
        </div>
      </div>
      <div className="panel">
        <div className="ph">Urutan yang disarankan</div>
        <div className="pb">
          <ol className="urut">
            <li>Putuskan hal di <b>Tugas</b> fase 0 (K-01…K-09).</li>
            <li>Perbaiki <b>Naskah SPMI</b> & lengkapi <b>Registri Form</b>.</li>
            <li>Jalankan <b>Siklus Mutu</b> dan catat <b>Log Bukti</b>.</li>
            <li>Isi <b>Evaluasi Diri</b>, <b>Checklist Dokumen</b>, dan <b>Instrumen EKLK</b>.</li>
            <li>Ikuti <b>Proses EKLK</b> lalu menuju akreditasi.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

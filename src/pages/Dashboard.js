import React from 'react';

export default function Dashboard({ data, onPilih }) {
  const d = (data && data.dashboard) || {};
  const fase = d.fase || [];
  const standar = d.standar || [];
  const eklk = d.eklk || [];
  const dok = d.dokumen || { verif: 0, total: 0 };
  const go = onPilih || function () {};

  return (
    <div className="body">
      <div className="kpis">
        <Kpi l="Total tugas" v={d.totalTugas != null ? d.totalTugas : '-'} dd="lintas divisi" onClick={() => go('modul-tugas')} />
        <Kpi l="Progres keseluruhan" v={(d.pctKeseluruhan != null ? d.pctKeseluruhan : 0) + '%'} dd="tugas selesai" onClick={() => go('alur')} />
        <Kpi l="Dokumen terverifikasi" v={<span>{dok.verif}<small className="den">/{dok.total}</small></span>} dd="bukti divalidasi" onClick={() => go('modul-dokumen')} />
        <Kpi l="Simulasi EKLK (10A)" v={eklk[0] ? (eklk[0].terisi ? eklk[0].nilai : '—') : '-'} dd={eklk[0] ? <Badge t={eklk[0].kategori} /> : ''} onClick={() => go('modul-eklk_bim')} />
      </div>

      <div className="row2">
        <Panel judul="Progres per fase alur kerja" kanan="buka peta →" onKanan={() => go('alur')}>
          {fase.length ? fase.map((f, i) => <Bar key={i} nama={f.nama} pct={f.pct} onClick={() => go('alur')} />) : <Kosong />}
        </Panel>
        <Panel judul="Simulasi nilai EKLK" kanan="nonresmi">
          <div className="mini klik" onClick={() => go('modul-eklk_bim')}><span>{eklk[0] ? eklk[0].nama : 'Bimbingan belajar (10A)'}</span>
            <b>{eklk[0] && eklk[0].terisi ? eklk[0].nilai.toFixed(2).replace('.', ',') : '—'} <Badge t={eklk[0] && eklk[0].kategori} /></b></div>
          <div className="mini klik" onClick={() => go('modul-eklk_ket')}><span>{eklk[1] ? eklk[1].nama : 'Keterampilan (10B)'}</span>
            <b>{eklk[1] && eklk[1].terisi ? eklk[1].nilai.toFixed(2).replace('.', ',') : '—'} <Badge t={eklk[1] && eklk[1].kategori} /></b></div>
          <div className="mini"><span>Kecakapan hidup (10C)</span><b>— <Badge t="kerangka" /></b></div>
        </Panel>
      </div>

      <div className="row2" style={{ marginTop: 14 }}>
        <Panel judul="Kesiapan bukti per standar" kanan="buka EDLK →" onKanan={() => go('modul-edlk')}>
          {standar.length ? standar.map((s, i) => <Bar key={i} nama={s.nama} pct={s.pct} onClick={() => go('modul-edlk')} />) : <Kosong />}
        </Panel>
        <Panel judul="Dokumen & bukti">
          <div className="mini klik" onClick={() => go('modul-dokumen')}><span>Dokumen terverifikasi memadai</span><b>{dok.verif} dari {dok.total}</b></div>
        </Panel>
      </div>
    </div>
  );
}

function Kpi({ l, v, dd, onClick }) {
  return <div className={'kpi' + (onClick ? ' klik' : '')} onClick={onClick}><div className="l">{l}</div><div className="v">{v}</div><div className="d">{dd}</div></div>;
}
function Panel({ judul, kanan, onKanan, children }) {
  return <div className="panel"><div className="ph">{judul}{kanan && <span className={'mt' + (onKanan ? ' klik' : '')} onClick={onKanan}>{kanan}</span>}</div><div className="pb">{children}</div></div>;
}
function Bar({ nama, pct, onClick }) {
  return (
    <div className={'prow' + (onClick ? ' klik' : '')} onClick={onClick}><div className="nm">{nama}</div>
      <div className="bar"><i style={{ width: Math.max(0, Math.min(100, pct)) + '%' }} /></div>
      <div className="pc">{pct}%</div></div>
  );
}
function Kosong() { return <div className="kosong">Belum ada data.</div>; }
function Badge({ t }) {
  if (!t || t === '-') return null;
  const cls = t === 'A' ? 'c-g' : t === 'B' ? 'c-a' : t === 'C' ? 'c-r' : 'c-m';
  return <span className={'chip ' + cls}>{t}</span>;
}

import { Link } from '@inertiajs/react';

export default function DokumentasiObservasiView({ kegiatans, openModal }) {
    return (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-100 uppercase bg-gray-700">
                <tr className="text-nowrap">
                    <th className="px-4 py-3">Nama Kegiatan</th>
                    <th className="px-4 py-3">Tanggal</th>
                    <th className="px-4 py-3">Status Dokumentasi</th>
                    <th className="px-4 py-3 text-center">Aksi</th>
                </tr>
            </thead>
            <tbody>
                {kegiatans.data.length > 0 ? (
                    kegiatans.data.map((kegiatan) => {
                        const dokObservasi = (kegiatan.dokumentasi ?? []).find(d => d.tipe === 'observasi');
                        return (
                            <tr key={kegiatan.id} className="bg-white border-b">
                                <td className="px-4 py-2">{kegiatan.nama_kegiatan}</td>
                                <td className="px-4 py-2">{kegiatan.tanggal_kegiatan}</td>
                                <td className="px-4 py-2">
                                    {dokObservasi ? (
                                        <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full">Sudah Diisi</span>
                                    ) : (
                                        <span className="px-2 py-1 font-semibold leading-tight text-orange-700 bg-orange-100 rounded-full">Belum Diisi</span>
                                    )}
                                </td>
                                <td className="px-4 py-2 text-center">
                                    {dokObservasi ? (
                                        <Link href={route('arsip.show', kegiatan.id)} className="font-medium text-indigo-600 hover:underline">Lihat Detail</Link>
                                    ) : (
                                        <button onClick={() => openModal('docs', kegiatan)} className="font-medium text-white bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-lg text-nowrap">Isi Dokumentasi</button>
                                    )}
                                </td>
                            </tr>
                        );
                    })
                ) : (
                    <tr>
                        <td colSpan="4" className="px-4 py-6 text-center text-gray-500">
                            Tidak ada kegiatan pada tahap ini.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

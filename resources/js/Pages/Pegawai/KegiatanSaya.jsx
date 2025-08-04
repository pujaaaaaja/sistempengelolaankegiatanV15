import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";
import Modal from "@/Components/Modal";
// ... (import komponen lainnya seperti PrimaryButton, TextInput, dll)

// NOTE: Ini adalah konten dari file MyIndex.jsx yang sudah ada,
// namun dengan penyesuaian pada endpoint form (route).

export default function KegiatanSaya({ auth, kegiatans, queryParams = null, success }) {
    // ... (semua state dan logika yang sudah ada di MyIndex.jsx)
    // const [selectedKegiatan, setSelectedKegiatan] = useState(null);
    // const [modalState, setModalState] = useState({ type: '', show: false });
    // const { data, setData, post, processing, errors, reset } = useForm({...});

    // --- CONTOH PENYESUAIAN PADA FUNGSI SUBMIT ---

    const submitObservasi = (e) => {
        e.preventDefault();
        // Endpoint LAMA: route('dokumentasi.observasi.store', selectedKegiatan.id)
        // Endpoint BARU:
        post(route('pegawai.kegiatan.storeObservasi', selectedKegiatan.id), {
            onSuccess: () => closeModal(),
        });
    };

    const submitPenyerahan = (e) => {
        e.preventDefault();
        // Endpoint LAMA: route('dokumentasi.penyerahan.store', selectedKegiatan.id)
        // Endpoint BARU:
        post(route('pegawai.kegiatan.storePenyerahan', selectedKegiatan.id), {
            onSuccess: () => closeModal(),
        });
    };
    
    const submitPenyelesaian = (e) => {
        e.preventDefault();
        // Endpoint LAMA: route('kegiatan.selesaikan', selectedKegiatan.id)
        // Endpoint BARU:
        post(route('pegawai.kegiatan.selesaikan', selectedKegiatan.id), {
            onSuccess: () => closeModal(),
        });
    };

    const handleConfirmKehadiran = (kegiatan) => {
        // Endpoint LAMA: route('kegiatan.confirmKehadiran', kegiatan.id)
        // Endpoint BARU:
        post(route('pegawai.kegiatan.confirmKehadiran', kegiatan.id));
    };


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Kegiatan Saya</h2>}
        >
            <Head title="Kegiatan Saya" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* ... (Seluruh JSX dari MyIndex.jsx diletakkan di sini) ... */}
                    {/* Pastikan semua pemanggilan `route()` di dalam form dan link */}
                    {/* sudah disesuaikan dengan nama rute baru di `web.php` */}
                </div>
            </div>

            {/* ... (Kode Modal yang sudah ada di MyIndex.jsx) ... */}

        </AuthenticatedLayout>
    );
}

import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';

export default function AuthenticatedLayout({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    // Fungsi untuk menampilkan menu sidebar berdasarkan peran (role) pengguna
    const renderSidebarMenu = () => {
        // Cek apakah pengguna memiliki peran tertentu
        const hasRole = (roleName) => user.roles.some(role => role.name === roleName);

        // Tampilkan menu untuk ADMIN
        if (hasRole('admin')) {
            return (
                <div className="flex flex-col space-y-2">
                    <NavLink href={route('user.index')} active={route().current('user.index')}>
                        Manajemen Pegawai
                    </NavLink>
                </div>
            );
        }

        // Tampilkan menu untuk PENGUSUL
        if (hasRole('pengusul')) {
            return (
                <div className="flex flex-col space-y-2">
                    <NavLink href={route('proposal.myIndex')} active={route().current('proposal.myIndex')}>
                        Proposal Saya
                    </NavLink>
                    <NavLink href={route('proposal.create')} active={route().current('proposal.create')}>
                        Ajukan Proposal
                    </NavLink>
                </div>
            );
        }

        // Tampilkan menu untuk KADIS
        if (hasRole('kadis')) {
            return (
                <div className="flex flex-col space-y-2">
                    <NavLink href={route('verifikasi.proposal.index')} active={route().current('verifikasi.proposal.index')}>
                        Verifikasi Proposal
                    </NavLink>
                    <NavLink href={route('kabid.proposal.index')} active={route().current('kabid.proposal.index')}>
                        Proposal Disetujui
                    </NavLink>
                </div>
            );
        }

        // Tampilkan menu untuk KABID
        if (hasRole('kabid')) {
            return (
                <div className="flex flex-col space-y-2">
                    <NavLink href={route('kabid.proposal.index')} active={route().current('kabid.proposal.index')}>
                        Proposal Disetujui
                    </NavLink>
                    <NavLink href={route('kegiatan.index')} active={route().current('kegiatan.*')}>
                        Manajemen Kegiatan
                    </NavLink>
                    {/* --- MENU BARU DITAMBAHKAN DI SINI --- */}
                    <NavLink href={route('manajemen.penyerahan.index')} active={route().current('manajemen.penyerahan.index')}>
                        Manajemen Penyerahan
                    </NavLink>
                    <NavLink href={route('tim.index')} active={route().current('tim.*')}>
                        Manajemen Tim
                    </NavLink>
                </div>
            );
        }

        // Tampilkan menu untuk PEGAWAI
        if (hasRole('pegawai')) {
            return (
                <div className="flex flex-col space-y-2">
                    <NavLink href={route('pegawai.kegiatan.myIndex')} active={route().current('pegawai.kegiatan.myIndex')}>
                        Kegiatan Saya
                    </NavLink>
                </div>
            );
        }

        // Jika tidak ada peran yang cocok, tampilkan menu default atau kosong
        return null;
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar Navigation */}
            <aside className="w-64 bg-white shadow-md p-4 flex flex-col">
                <Link href="/" className="flex items-center justify-center mb-6">
                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                </Link>
                
                <nav className="flex flex-col space-y-2">
                    <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                        Dashboard
                    </NavLink>

                    {/* Render menu spesifik peran di sini */}
                    <div className="mt-4 border-t pt-4">
                        <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Menu Utama
                        </h3>
                        <div className="mt-2">
                            {renderSidebarMenu()}
                        </div>
                    </div>
                </nav>

                {/* Menu Arsip di bagian bawah untuk semua peran */}
                <div className="mt-auto pt-4 border-t">
                     <NavLink href={route('arsip.index')} active={route().current('arsip.index*')}>
                        Arsip
                    </NavLink>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm-px-6 lg-px-8 flex justify-between items-center">
                        {header}
                        {/* User Dropdown */}
                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            <div className="ms-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {user.name}
                                                <svg className="ms-2 -me-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}

import { useState } from 'react'
import {
  ClipboardList, CalendarDays, Landmark, Wallet, CreditCard,
  ShieldCheck, Headset, RotateCcw, Copy, Check, X, ChevronDown, ChevronUp, BookOpen,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const paymentMethods = [
  { id: 'tunai', name: 'Bayar Tunai', desc: 'Di Lokasi', icon: Wallet },
  { id: 'transfer', name: 'Transfer Bank', desc: 'BRI, BNI, Mandiri, BCA', icon: Landmark },
  { id: 'ewallet', name: 'E-Wallet', desc: 'OVO, GoPay, Dana', icon: CreditCard, wallets: ['OVO', 'GOPAY', 'DANA'] },
]

const banks = ['BRI', 'BNI', 'Mandiri', 'BCA']

const vaNumbers = {
  BRI: '8878 0812 3456 7890',
  BNI: '8880 0812 3456 7890',
  Mandiri: '8881 0812 3456 7890',
  BCA: '8882 0812 3456 7890',
}

const mobileInstruksi = [
  '1. Login ke aplikasi <b>BRImo</b>.',
  '2. Pilih menu <b>BRIVA</b>.',
  '3. Pilih <b>Pembayaran Baru</b> & masukkan nomor Virtual Account.',
  '4. Konfirmasi detail dan masukkan <b>PIN</b> Anda.',
]

const atmInstruksi = [
  '1. Masukkan kartu ATM dan PIN Anda.',
  '2. Pilih menu <b>Transaksi Lain</b> → <b>Pembayaran</b>.',
  '3. Pilih <b>BRIVA</b> dan masukkan nomor Virtual Account.',
  '4. Konfirmasi detail pembayaran dan pilih <b>Ya</b>.',
]

export default function DetailPesanan() {
  const [selectedMethod, setSelectedMethod] = useState('transfer')
  const [selectedBank, setSelectedBank] = useState('BRI')
  const [showKonfirmasi, setShowKonfirmasi] = useState(false)
  const [showVA, setShowVA] = useState(false)
  const [openInstruksi, setOpenInstruksi] = useState('mobile')
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(vaNumbers[selectedBank].replace(/\s/g, ''))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleBuatPesanan = () => {
    setShowKonfirmasi(false)
    if (selectedMethod === 'transfer') setShowVA(true)
  }

  return (
    <div className="pb-10 max-w-[920px] mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-[28px] sm:text-[34px] font-extrabold text-[#0a0f44] tracking-tight italic">
          Invoice Pembayaran
        </h1>
        <p className="text-[14px] text-slate-500 mt-1.5">
          Tinjau rincian sesi dan pilih metode pembayaran untuk melanjutkan bimbingan Anda.
        </p>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Left Column */}
        <div className="lg:col-span-3 space-y-5">
          {/* Ringkasan Pesanan */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6">
            <div className="flex items-center gap-2 mb-5">
              <ClipboardList className="h-5 w-5 text-teal-600" />
              <h2 className="text-[17px] font-bold text-teal-700">Ringkasan Pesanan</h2>
            </div>
            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
              <div>
                <p className="text-[10px] font-bold tracking-[0.1em] text-slate-400 uppercase">LEARNER</p>
                <p className="text-[14px] font-bold text-slate-900 mt-1">Budi Santoso</p>
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-[0.1em] text-slate-400 uppercase">TUTOR</p>
                <p className="text-[14px] font-bold text-slate-900 mt-1">Irkham Wildan</p>
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-[0.1em] text-slate-400 uppercase">MATA PELAJARAN</p>
                <span className="inline-block mt-1.5 text-[12px] font-medium text-teal-700 bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-lg">
                  Algoritma &amp; Struktur Data
                </span>
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-[0.1em] text-slate-400 uppercase">JADWAL SESI</p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <CalendarDays className="h-3.5 w-3.5 text-teal-500" />
                  <span className="text-[13px] text-slate-700">Senin, 14 Okt</span>
                </div>
                <p className="text-[13px] text-slate-500 ml-5">11:00 - 12:30</p>
              </div>
            </div>
          </div>

          {/* Metode Pembayaran */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6">
            <div className="flex items-center gap-2 mb-5">
              <CreditCard className="h-5 w-5 text-teal-600" />
              <h2 className="text-[17px] font-bold text-teal-700">Metode Pembayaran</h2>
            </div>
            <div className="space-y-2.5">
              {paymentMethods.map((method) => {
                const isSelected = selectedMethod === method.id
                return (
                  <div key={method.id}>
                    <button
                      onClick={() => setSelectedMethod(method.id)}
                      className={`flex items-center gap-3.5 p-4 rounded-xl border-2 transition-all text-left w-full ${
                        isSelected ? 'border-teal-500 bg-teal-50/40' : 'border-slate-100 hover:border-slate-200'
                      }`}
                    >
                      <div className={`h-9 w-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        isSelected ? 'bg-teal-100 text-teal-700' : 'bg-slate-100 text-slate-400'
                      }`}>
                        <method.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[13px] font-semibold text-slate-800">{method.name}</p>
                        <p className="text-[11px] text-slate-400">{method.desc}</p>
                      </div>
                      <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? 'border-teal-500' : 'border-slate-300'
                      }`}>
                        {isSelected && <div className="h-2.5 w-2.5 rounded-full bg-teal-500" />}
                      </div>
                    </button>

                    {/* Transfer Bank → Bank Selection */}
                    {method.id === 'transfer' && isSelected && (
                      <div className="mt-3 ml-2">
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Pilih Bank</p>
                        <div className="flex gap-2 flex-wrap">
                          {banks.map((bank) => (
                            <button
                              key={bank}
                              onClick={() => setSelectedBank(bank)}
                              className={`px-4 py-2 rounded-xl border-2 text-[13px] font-bold transition-all ${
                                selectedBank === bank
                                  ? 'border-teal-500 bg-teal-50 text-teal-700'
                                  : 'border-slate-200 text-slate-500 hover:border-slate-300'
                              }`}
                            >
                              {bank}
                            </button>
                          ))}
                        </div>
                        <div className="mt-3 bg-slate-50 rounded-xl p-3 border border-slate-100">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            Nomor Virtual Account {selectedBank}
                          </p>
                          <div className="flex items-center justify-between mt-1">
                            <p className="text-[18px] font-extrabold text-[#0a0f44] tracking-wide">
                              {vaNumbers[selectedBank]}
                            </p>
                            <button
                              onClick={handleCopy}
                              className="flex items-center gap-1 text-[12px] font-semibold text-teal-600 hover:text-teal-700 border border-teal-200 bg-white px-3 py-1.5 rounded-lg"
                            >
                              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                              {copied ? 'Tersalin' : 'Salin'}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* E-Wallet sub options */}
                    {method.id === 'ewallet' && selectedMethod === 'ewallet' && (
                      <div className="flex gap-2 ml-[52px] mt-2">
                        {method.wallets.map((w) => (
                          <button key={w} className="px-4 py-1.5 rounded-lg border border-slate-200 text-[10px] font-bold text-slate-600 hover:bg-slate-50 tracking-wider">
                            {w}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right Column - Rincian Harga */}
        <div className="lg:col-span-2">
          <div className="sticky top-8 space-y-4">
            <div className="bg-[#0a0f44] rounded-2xl p-6 text-white">
              <div className="flex items-center gap-2 mb-5">
                <CreditCard className="h-4 w-4 text-teal-300" />
                <h2 className="text-[16px] font-bold">Rincian Harga</h2>
              </div>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-[13px] text-indigo-200">Biaya Sesi (1 jam)</span>
                  <span className="text-[13px] font-semibold text-teal-300">Rp 45.000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[13px] text-indigo-200">Biaya Layanan</span>
                  <span className="text-[13px] font-semibold text-teal-300">Rp 15.000</span>
                </div>
              </div>
              <div className="h-px bg-indigo-700 mb-4" />
              <p className="text-[9px] font-bold tracking-[0.12em] text-teal-300 uppercase">TOTAL PEMBAYARAN</p>
              <p className="text-[32px] font-extrabold text-white mt-0.5 leading-none">Rp 60.000</p>
              <div className="mt-4 bg-indigo-900/50 rounded-lg p-3 flex items-start gap-2">
                <ShieldCheck className="h-4 w-4 text-teal-300 flex-shrink-0 mt-0.5" />
                <p className="text-[11px] text-indigo-200 leading-relaxed">
                  Pembayaran Anda dijamin aman melalui sistem escrow kami. Dana hanya akan diteruskan ke tutor setelah sesi selesai.
                </p>
              </div>
            </div>
            <Button
              onClick={() => setShowKonfirmasi(true)}
              className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl py-5 text-[15px] font-bold shadow-none w-full"
            >
              Konfirmasi
            </Button>
            <p className="text-[11px] text-center text-slate-400">
              Dengan membayar, Anda menyetujui{' '}
              <a href="#" className="underline font-medium text-slate-600">Ketentuan Layanan</a>
              {' & '}
              <a href="#" className="underline font-medium text-slate-600">Kebijakan Privasi</a> KonekDin.
            </p>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="flex items-center justify-center gap-8 text-slate-400 pt-8 flex-wrap">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="h-4 w-4" />
          <span className="uppercase tracking-[0.12em] text-[10px] font-bold">Verified Secure</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Headset className="h-4 w-4" />
          <span className="uppercase tracking-[0.12em] text-[10px] font-bold">24/7 Support</span>
        </div>
        <div className="flex items-center gap-1.5">
          <RotateCcw className="h-4 w-4" />
          <span className="uppercase tracking-[0.12em] text-[10px] font-bold">Easy Refund</span>
        </div>
      </div>

      {/* ======= MODAL: Konfirmasi / Ringkasan Pesanan ======= */}
      {showKonfirmasi && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowKonfirmasi(false)} />
          <div className="relative bg-white rounded-3xl w-full max-w-[400px] overflow-hidden shadow-2xl">
            {/* Dark header */}
            <div className="bg-[#0a0f44] px-6 pt-8 pb-12 text-center">
              <div className="h-14 w-14 rounded-2xl bg-[#1a2466] flex items-center justify-center mx-auto mb-4">
                <ClipboardList className="h-7 w-7 text-teal-300" />
              </div>
              <h2 className="text-[24px] font-extrabold text-white">Ringkasan Pesanan</h2>
              <p className="text-[13px] text-indigo-300 mt-1">Konfirmasi rincian sesi mentorship Anda</p>
            </div>
            {/* White body overlapping */}
            <div className="-mt-6 bg-white rounded-t-3xl px-6 pt-6 pb-6">
              <div className="flex items-center gap-3 bg-slate-50 rounded-2xl p-4 mb-3">
                <div className="h-10 w-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="h-5 w-5 text-slate-400" />
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-[0.1em] text-slate-400 uppercase">MATA PELAJARAN</p>
                  <p className="text-[15px] font-bold text-teal-600">Algoritma &amp; Struktur Data</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-slate-50 rounded-2xl p-4 mb-5">
                <div className="h-10 w-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center flex-shrink-0">
                  <CalendarDays className="h-5 w-5 text-slate-400" />
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-[0.1em] text-slate-400 uppercase">WAKTU SESI</p>
                  <p className="text-[15px] font-bold text-teal-600">Senin, 14 Okt, 11:00</p>
                </div>
              </div>
              <div className="h-px bg-slate-100 mb-4" />
              <div className="space-y-2 mb-3">
                <div className="flex justify-between">
                  <span className="text-[13px] text-slate-500">Biaya Sesi (1 Jam)</span>
                  <span className="text-[13px] text-slate-700 font-medium">Rp 45.000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[13px] text-slate-500">Biaya Layanan</span>
                  <span className="text-[13px] text-slate-700 font-medium">Rp 15.000</span>
                </div>
              </div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-[14px] font-bold text-teal-600">Total Pembayaran</span>
                <span className="text-[22px] font-extrabold text-[#0a0f44]">Rp 60.000</span>
              </div>
              <div className="flex items-center justify-between">
                <button onClick={() => setShowKonfirmasi(false)} className="text-[14px] font-semibold text-slate-500 hover:text-slate-700 px-4 py-2">
                  Batal
                </button>
                <Button onClick={handleBuatPesanan} className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl px-8 h-11 text-[14px] font-bold shadow-none">
                  Buat Pesanan
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======= MODAL: Virtual Account ======= */}
      {showVA && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowVA(false)} />
          <div className="relative bg-white rounded-3xl w-full max-w-[420px] overflow-hidden shadow-2xl">
            {/* VA Header */}
            <div className="bg-[#0a0f44] px-5 py-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-[#1a2466] flex items-center justify-center flex-shrink-0">
                <Landmark className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-[16px] font-bold text-white">Virtual Account {selectedBank}</p>
                <p className="text-[12px] text-indigo-300">Pembayaran Otomatis</p>
              </div>
              <button onClick={() => setShowVA(false)} className="text-indigo-300 hover:text-white transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* VA Body */}
            <div className="px-5 py-5 space-y-5">
              {/* VA Number */}
              <div className="bg-slate-50 rounded-2xl p-5">
                <p className="text-[10px] font-bold tracking-[0.14em] text-slate-400 uppercase mb-3">
                  NOMOR VIRTUAL ACCOUNT
                </p>
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[28px] font-extrabold text-[#0a0f44] leading-tight tracking-wide">
                    {vaNumbers[selectedBank]}
                  </p>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-[13px] font-bold text-teal-600 border border-teal-200 bg-white px-3 py-2 rounded-xl hover:bg-teal-50 transition-colors flex-shrink-0"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copied ? 'Tersalin' : 'Salin'}
                  </button>
                </div>
              </div>

              {/* Instruksi */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-5 w-5 rounded-full border-2 border-teal-500 flex items-center justify-center flex-shrink-0">
                    <div className="h-2 w-2 rounded-full bg-teal-500" />
                  </div>
                  <p className="text-[15px] font-bold text-teal-600">Instruksi Pembayaran</p>
                </div>

                {/* Mobile Banking Accordion */}
                <div className="border border-slate-100 rounded-xl overflow-hidden mb-2">
                  <button
                    onClick={() => setOpenInstruksi(openInstruksi === 'mobile' ? null : 'mobile')}
                    className="w-full flex items-center justify-between px-4 py-3.5 text-left bg-white hover:bg-slate-50"
                  >
                    <span className="text-[14px] font-bold text-slate-800">Mobile Banking ({selectedBank === 'BRI' ? 'BRImo' : selectedBank === 'BNI' ? 'BNI Mobile' : selectedBank === 'Mandiri' ? 'Livin' : 'myBCA'})</span>
                    {openInstruksi === 'mobile' ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
                  </button>
                  {openInstruksi === 'mobile' && (
                    <div className="px-4 pb-4 pt-1 bg-white border-t border-slate-100">
                      <ul className="space-y-2">
                        {mobileInstruksi.map((step, i) => (
                          <li key={i} className="text-[13px] text-slate-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: step }} />
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* ATM Accordion */}
                <div className="border border-slate-100 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenInstruksi(openInstruksi === 'atm' ? null : 'atm')}
                    className="w-full flex items-center justify-between px-4 py-3.5 text-left bg-white hover:bg-slate-50"
                  >
                    <span className="text-[14px] font-bold text-slate-800">ATM {selectedBank}</span>
                    {openInstruksi === 'atm' ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
                  </button>
                  {openInstruksi === 'atm' && (
                    <div className="px-4 pb-4 pt-1 bg-white border-t border-slate-100">
                      <ul className="space-y-2">
                        {atmInstruksi.map((step, i) => (
                          <li key={i} className="text-[13px] text-slate-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: step }} />
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <Button onClick={() => setShowVA(false)} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl h-12 text-[16px] font-bold shadow-none">
                OK
              </Button>
              <button
                onClick={() => { setShowVA(false); setSelectedMethod('transfer') }}
                className="w-full text-[13px] font-semibold text-slate-500 hover:text-slate-700 text-center"
              >
                Tutup &amp; Pilih Metode Lain
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Home() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start">
          {/* Company Information */}
          <div className="mb-4 md:mb-0 md:w-1/3">
            <h1 className="text-2xl font-bold">Second Round OÜ</h1>
            <p className="text-sm mt-2">Kassisilma 2, Räni, 61708 Tartu maakond</p>
            <p className="text-sm mt-2">+3725556 2338</p>
            <p className="text-sm mt-2">contact@secondround.eu</p>
          </div>

          {/* Menu */}
          <div className="mb-4 md:mb-0 md:w-1/3">
            <h2 className="text-xl font-bold">Menüü</h2>
            <ul className="mt-2 space-y-1">
              <li><a href="#" className="hover:text-gray-400">Esileht</a></li>
              <li><a href="#" className="hover:text-gray-400">Ettevõttest</a></li>
              <li><a href="#" className="hover:text-gray-400">Kes me oleme</a></li>
              <li><a href="#" className="hover:text-gray-400">Hindamine</a></li>
              <li><a href="#" className="hover:text-gray-400">Kontakt</a></li>
            </ul>
          </div>

          {/* Links */}
          <div className="md:w-1/3">
            <h2 className="text-xl font-bold">Links</h2>
            <ul className="mt-2 space-y-1">
              <li><a href="#" className="hover:text-gray-400">Privacy policy</a></li>
              <li><a href="#" className="hover:text-gray-400">GDPR</a></li>
              <li><a href="#" className="hover:text-gray-400">Good to know</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-6 text-center">
          <p className="text-sm">© 2024 Second Round. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
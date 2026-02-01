export default function Footer() {
  return (
    <footer className="mt-24 border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h4 className="mb-3 text-sm font-semibold">Meubel House</h4>
            <p className="text-sm text-neutral-600">
              400 University Drive Suite 200 Coral Gables, FL 33134 USA
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold">Links</h4>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li>Home</li>
              <li>Shop</li>
              <li>About</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold">Help</h4>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li>Payment Options</li>
              <li>Returns</li>
              <li>Privacy Policies</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold">Newsletter</h4>
            <div className="flex gap-2">
              <input
                className="flex-1 rounded-md border border-neutral-300 px-3 py-2 text-sm"
                placeholder="Enter Your Email Address"
              />
              <button className="rounded-md border border-neutral-300 px-4 py-2 text-sm">
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-neutral-200 pt-6 text-center text-sm text-neutral-600">
          2022 Meubel House. All rights reserved
        </div>
      </div>
    </footer>
  );
}

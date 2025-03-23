import './App.css';

function App() {
  return (
    <>
      <main className="h-screen max-h-screen grow bg-gray-100 px-20 py-12">
        <section className="h-full">
          <div className="mb-20 text-5xl font-extralight text-black">
            <span>Home Office</span>
            <p>Essentials.</p>
          </div>
          <div className="mb-32 flex gap-4">
            <div className="flex w-fit flex-col gap-4 bg-gray-200 p-4">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-orange-100/60 px-4 py-1 text-sm">Some badge</span>
                <button className="rounded-full bg-white/60 px-4 py-1 text-sm">Customize</button>
              </div>
              <img
                src="https://png.pngtree.com/png-vector/20231023/ourmid/pngtree-modern-wooden-desk-desk-png-image_10294080.png"
                alt="Desk image"
                width={400}
                height={400}
              />
              <div className="flex items-center gap-3 bg-white p-3">
                <div>
                  <p className="font-medium">Standing Desk</p>
                  <p className="text-sm text-gray-400">From $990.00</p>
                </div>
                <div className="ml-auto w-px self-stretch bg-gray-400" />
                <img
                  src="/shopping-cart.svg"
                  alt="Shopping cart icon"
                  className="ml-1 mr-2"
                  width={24}
                  height={24}
                />
              </div>
            </div>
            <div className="flex w-fit flex-col gap-4 bg-gray-200 p-4">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-orange-100/60 px-4 py-1 text-sm">Some badge</span>
                <button className="rounded-full bg-white/60 px-4 py-1 text-sm">Customize</button>
              </div>
              <img
                src="https://png.pngtree.com/png-vector/20231023/ourmid/pngtree-modern-wooden-desk-desk-png-image_10294080.png"
                alt="Desk image"
                width={400}
                height={400}
              />
              <div className="flex items-center gap-3 bg-white p-3">
                <div>
                  <p className="font-medium">Standing Desk</p>
                  <p className="text-sm text-gray-400">From $990.00</p>
                </div>
                <div className="ml-auto w-px self-stretch bg-gray-400" />
                <img
                  src="/shopping-cart.svg"
                  alt="Shopping cart icon"
                  className="ml-1 mr-2"
                  width={24}
                  height={24}
                />
              </div>
            </div>
            <div className="flex w-fit flex-col gap-4 bg-gray-200 p-4">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-orange-100/60 px-4 py-1 text-sm">Some badge</span>
                <button className="rounded-full bg-white/60 px-4 py-1 text-sm">Customize</button>
              </div>
              <img
                src="https://png.pngtree.com/png-vector/20231023/ourmid/pngtree-modern-wooden-desk-desk-png-image_10294080.png"
                alt="Desk image"
                width={400}
                height={400}
              />
              <div className="flex items-center gap-3 bg-white p-3">
                <div>
                  <p className="font-medium">Standing Desk</p>
                  <p className="text-sm text-gray-400">From $990.00</p>
                </div>
                <div className="ml-auto w-px self-stretch bg-gray-400" />
                <img
                  src="/shopping-cart.svg"
                  alt="Shopping cart icon"
                  className="ml-1 mr-2"
                  width={24}
                  height={24}
                />
              </div>
            </div>
          </div>
          <p className="mb-4 text-4xl font-light">See more produce</p>
          <button className="rounded-full bg-gray-200 px-8 py-2">
            <img src="/arrow-right.svg" alt="Arrow right icon" width={24} height={24} />
          </button>
        </section>
      </main>
    </>
  );
}

export default App;

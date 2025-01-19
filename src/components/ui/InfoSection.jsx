import React from 'react'

function InfoSection() {
  return (
    <div>
        <section>
  <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:items-center md:gap-8">
      <div className="md:col-span-3">
        <img
          src="https://media.autoexpress.co.uk/image/private/s--2Cm7A8Mh--/v1604683155/autoexpress/2020/11/BMW%20i4%20exclusive%20images.jpg"
          className="rounded"
          alt=""
        />
      </div>

      <div className="md:col-span-1">
        <div className="max-w-lg md:max-w-none">
          <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h2>

          <p className="mt-4 text-gray-700">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur doloremque saepe
            architecto maiores repudiandae amet perferendis repellendus, reprehenderit voluptas
            sequi.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default InfoSection
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'

import { queryMarketPlace } from '@/repositories/market-place'
import type { Extension } from '@/types/market-place'

const Home: NextPage = () => {
  const [extensions, setExtensions] = useState<Extension[]>([])

  useEffect(() => {
    const f = async () => {
      const result = await queryMarketPlace('python', 1, 1)
      setExtensions(extensions.concat(result.extensions))
    }
    void f()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const extentionCards = extensions.map((extension) => {
    return (
      <label
        key={extension.extensionId}
        htmlFor={extension.extensionId}
        className='flex-1 card border-primary card-bordered card-body card-side flex-row gap-8 justify-between items-center bg-neutral hover:bg-neutral-focus '
      >
        <input
          type='checkbox'
          className='flex-none peer checkbox checkbox-primary'
          // checked={true}
          id={extension.extensionId}
        />
        <div className='flex flex-col gap-5'>
          <div>
            <h2 className='card-title'>{extension.displayName}</h2>
            <p>{`${extension.publisher.publisherName}.${extension.extensionName}`}</p>
          </div>
          <div>
            <h3 className='font-bold'>About</h3>
            <p>{extension.shortDescription}</p>
          </div>
        </div>
      </label>
    )
  })

  return <div className='flex flex-col gap-2'>{extentionCards}</div>
}

export default Home

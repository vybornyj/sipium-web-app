import { NextPage } from 'next'
import { TemplateMain } from 'src/components/templates/template-main/TemplateMain'

const Page: NextPage = () => {
  return (
    <TemplateMain title='Payment Canceled'>
      <div className='global-center'>
        <h1>Payment Canceled</h1>

        <style jsx>{
          /* language=CSS */ `
            h1 {
              color: white;
            }
          `
        }</style>
      </div>
    </TemplateMain>
  )
}

export default Page

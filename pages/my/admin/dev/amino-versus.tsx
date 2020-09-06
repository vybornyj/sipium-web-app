import { NextPage } from 'next'
import { AppTable } from 'src/components/common/tables/AppTable'
import { TemplateUser } from 'src/components/templates/template-user/TemplateUser'
import { withSspWrapper } from 'src/scripts-server/sessions/withSspWrapper'
import { convertAminoAcidToGates } from 'src/scripts/@sipium/convert/convertAminoAcidToGates'
import { convertGateToAminoAcid } from 'src/scripts/@sipium/convert/convertGateToAminoAcid'
import { idsAminoAcids } from 'src/scripts/@sipium/enums/idsAminoAcids'
import { idsGates } from 'src/scripts/@sipium/enums/idsGates'
import { idsSipiumGates } from 'src/scripts/@sipium/enums/idsSipiumGates'
import { langAminoAcids } from 'src/scripts/@sipium/lang/langAminoAcids'

const Page: NextPage = () => (
  <TemplateUser title='Amino Versus'>
    <div className='global-box-1400'>
      <div className='column767-row768'>
        <div>
          <h3 className='global'>All Amino Acids vs All Gates vs Sipium</h3>
          <AppTable>
            {idsAminoAcids.map((aminoAcid) => {
              let gates = convertAminoAcidToGates[aminoAcid]
              gates.sort((a, b) => a - b)
              const className = String(idsSipiumGates.some((r) => gates.includes(r)))
              return (
                <div key={aminoAcid}>
                  <div className={className}>{langAminoAcids[aminoAcid].en}</div>
                  <div className={className}>{langAminoAcids[aminoAcid].ru}</div>
                  {gates.map((gate) => (
                    <span key='gate' className={String(idsSipiumGates.includes(gate))}>{` ${gate} `}</span>
                  ))}
                </div>
              )
            })}
          </AppTable>
        </div>
        <div>
          <h3 className='global'>All Gates vs All Amino Acids vs Sipium</h3>
          <AppTable>
            {idsGates.map((gate) => {
              const className = String(idsSipiumGates.includes(gate))
              return (
                <div key={gate}>
                  <div className={className}>{gate}</div>
                  <div className={className}>{langAminoAcids[convertGateToAminoAcid[gate]].ru}</div>
                  <div className={className}>{langAminoAcids[convertGateToAminoAcid[gate]].en}</div>
                </div>
              )
            })}
          </AppTable>
        </div>
      </div>

      <style jsx>{
        /* language=CSS */ `
          span {
            padding: 0 3px;
          }

          .true {
            font-weight: 600;
          }

          .false {
            color: hsl(0, 0%, 70%);
          }
        `
      }</style>
    </div>
  </TemplateUser>
)

export const getServerSideProps = withSspWrapper('admin')

export default Page

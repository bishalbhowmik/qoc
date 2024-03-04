import React from 'react'
import { connect } from 'react-redux'
import image from '../../assets/about.svg'

export const About = (props) => {
    return (
        <div className='px-3 md:px-10'>

            <div className='text-2xl font-bold text-center my-10'>About</div>

            <div className='grid grid-cols-1 md:grid-cols-3'>
                <div className='md:col-span-1 flex justify-center text-center'>
                    <img className='w-3/4 md:w-5/6' src={image} alt="" />
                </div>
                <div className='md:col-span-2'>
                    <div className='text-xl text-red-800 my-5 font-bold'>Who are we?</div>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, blanditiis. Animi vero consectetur iste possimus, debitis incidunt unde labore necessitatibus numquam dicta nam quam maiores eaque minima, nisi consequuntur ea quas quae laudantium aut vitae nihil dolorem ipsum? Dignissimos adipisci, accusantium dicta vel veritatis quaerat deserunt eligendi. Incidunt vero mollitia esse reiciendis ratione cumque. Aperiam, assumenda dolore! Necessitatibus nobis voluptatem saepe architecto asperiores quidem repellat rerum sapiente alias. Provident magni illo voluptatibus tempora quia dolore animi. Totam laboriosam est facilis nihil deleniti nam? Tempora quaerat, nesciunt placeat corrupti quo ratione voluptatibus non nostrum, ut minus quam aliquid maxime fugit quasi?
                    </p>

                    <p className='mt-8'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Non corrupti veniam doloribus sequi iste in voluptate hic, repellat soluta voluptates sunt dolorum rem mollitia culpa quam. Doloremque aspernatur culpa tenetur ab reiciendis possimus voluptatum quae quia libero fugit exercitationem fugiat suscipit cum totam blanditiis ut, nisi ea reprehenderit animi iste?
                    </p>
                </div>
            </div>

            <div>
                <div className='my-10'>
                    <div className='text-xl text-red-800 my-5 font-bold'>Our Mission</div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, blanditiis. Animi vero consectetur iste possimus, debitis incidunt unde labore necessitatibus numquam dicta nam quam maiores eaque minima, nisi consequuntur ea quas quae laudantium aut vitae nihil dolorem ipsum? Dignissimos adipisci, accusantium dicta vel veritatis quaerat deserunt eligendi. Incidunt vero mollitia esse reiciendis ratione cumque. Aperiam, assumenda dolore! Necessitatibus nobis voluptatem saepe architecto asperiores quidem repellat rerum sapiente alias. Provident magni illo voluptatibus tempora quia dolore animi. Totam laboriosam est facilis nihil deleniti nam? Tempora quaerat, nesciunt placeat corrupti quo ratione voluptatibus non nostrum, ut minus quam aliquid maxime fugit quasi?
                </div>

                <div className='my-5'>
                    <div className='text-xl text-red-800 my-5 font-bold'>Our vission</div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit, blanditiis. Animi vero consectetur iste possimus, debitis incidunt unde labore necessitatibus numquam dicta nam quam maiores eaque minima, nisi consequuntur ea quas quae laudantium aut vitae nihil dolorem ipsum? Dignissimos adipisci, accusantium dicta vel veritatis quaerat deserunt eligendi. Incidunt vero mollitia esse reiciendis ratione cumque. Aperiam, assumenda dolore! Necessitatibus nobis voluptatem saepe architecto asperiores quidem repellat rerum sapiente alias. Provident magni illo voluptatibus tempora quia dolore animi. Totam laboriosam est facilis nihil deleniti nam? Tempora quaerat, nesciunt placeat corrupti quo ratione voluptatibus non nostrum, ut minus quam aliquid maxime fugit quasi?
                </div>
            </div>

        </div>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(About)
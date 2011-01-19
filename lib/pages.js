/*!
 * OPOWER Jobs
 * Copyright(c) 2010 Dylan Greene <dylang@gmail.com>
 * MIT Licensed
 */

module.exports.tree = [

        {
            id: 'welcome',
            label: 'Welcome',
            url: '',
            file: 'index'
        },
        {
            id: 'jobs',
            label: 'Jobs',
            children: [
                {
                    id: 'teams',
                    label: 'Teams',
                    url: 'teams'
                },
/*                {
                    id: 'all',
                    label: 'All Openings',
                    url: 'all'
                },*/
                {
                    id: 'locations',
                    label: 'All Openings',
                    file: 'jobs/locations/locations',
                    url: 'locations'
                },
                {
                    id: 'engineering',
                    label: 'Engineering Spotlight',
                    url: 'engineering'
                },
                {
                    id: 'interviewing',
                    label: 'Interviewing',
                    url: 'interviewing',
                    file: 'content/interviewing'
                }
            ]
            
        },
        {
            id: 'about',
            label: 'Working Here',
            children: [

                {
                    id: 'ourstory',
                    label: 'Our Story',
                    url: 'our-story',
                    file: 'content/our-story'
                },
                {
                    id: 'workinghere',
                    label: 'Life at OPOWER',
                    url: 'working-here',
                    file: 'content/working-here'
                },
                {
                    id: 'meettheteam',
                    label: 'Meet the Team',
                    url: 'meet-the-team',
                    file: 'content/meet-the-team',
// TODO: There has got to be a better place to put this data.
                    team: [
    {
        first_name: 'Deena',
        last_name: 'Rosen',
        img_1: 'deena_rosen-1.jpg',
        img_2: 'deena_rosen-2.jpg',
        dept: 'User Experience',
        location: 'VA',
        reason: 'As a designer, getting to work on products that reach millions of everyday people and help the planet is an amazing opportunity. I feel truly lucky. Plus, free massages.'
    },
    {
        first_name: 'Nadeem',
        last_name: 'Sheikh',
        img_1: 'nadeem-1.jpg',
        img_2: 'nadeem-2.jpg',
        dept: 'Client Solutions',
        location: 'SF',
        reason: 'OPOWER isn\'t just another expensive "green" product that only a few can afford - we help millions of Americans from every walk of life to save energy, save money, and help the environment.'
    },
    {
        first_name: 'Jordan',
        last_name: 'Jakubovitz',
        img_1: 'jordan_1.jpg',
        img_2: 'jordan_2.jpg',
        dept: 'Marketing',
        location: 'VA',
        reason: 'I can challenge myself at work and make a difference at the same time.'
    },
    {
        first_name: 'Jeff',
        last_name: 'Kolesky',
        img_1: 'jeff_k-1.png',
        img_2: 'jeff_k-2.png',
        dept: 'Engineering',
        location: 'VA',
        reason: 'I get a chance to help save our planet doing the type of work I love to do.'
    },
// START SMAUTOMATED
{
  first_name: 'Faisal',
  last_name: 'Raza',
  img_1: 'faisal_raza-1.jpg',
  img_2: 'faisal_raza-2.jpg',
  dept: 'Consumer Marketing & Operations',
  location: 'VA',
  reason: 'its software innovation and execution at its finest'
},
{
  first_name: 'Eli ',
  last_name: 'Timberg',
  img_1: 'eli_timberg-1.jpg',
  img_2: 'eli_timberg-2.jpg',
  dept: 'Consumer Marketing & Operations',
  location: 'VA',
  reason: 'two words..Ping Pong!'
},
{
  first_name: 'Vinita',
  last_name: 'Bhaskar',
  img_1: 'vinita_bhaskar-1.jpg',
  img_2: 'vinita_bhaskar-2.jpg',
  dept: 'Client Solutions',
  location: 'VA',
  reason: 'it\'s relaxed, intelligent, fun, and limitless.'
},
{
  first_name: 'Joan',
  last_name: 'Xu',
  img_1: '',
  img_2: '',
  dept: 'Consumer Marketing & Operations',
  location: 'VA',
  reason: 'of the opportunity to help people across the country make better choices when consuming energy and its upbeat and open-minded culture.'
},
{
  first_name: 'Roderick',
  last_name: 'Morris',
  img_1: '',
  img_2: '',
  dept: 'Consumer Marketing & Operations',
  location: 'VA',
  reason: 'The talent level is so high, the mission is so great, and the growth we\'re all participating in is a phenomenal, once-in-a-lifetime thing.'
},
{
  first_name: 'Taj',
  last_name: 'Chadha',
  img_1: '',
  img_2: '',
  dept: 'Consumer Marketing & Operations',
  location: 'VA',
  reason: 'of the chance to be a part of something that actually changes people\'s lives.'
},
{
  first_name: 'Scott',
  last_name: 'Forman',
  img_1: '',
  img_2: '',
  dept: 'Product Management',
  location: 'VA',
  reason: 'it\'s a group of incredibly talented people using software to solve one of the great environmental challenges we face as a species. '
},
{
  first_name: 'Gabe',
  last_name: 'Cohen',
  img_1: '',
  img_2: '',
  dept: '',
  location: '',
  reason: 'I want to wake up every day and care deeply about the results of my work.  '
},
{
  first_name: 'William',
  last_name: 'Valadez',
  img_1: 'william_valadez-1.png',
  img_2: 'william_valadez-2.png',
  dept: 'Systems Administration',
  location: 'VA',
  reason: 'energy efficient death lasers will keep the local systems in line.'
},
{
  first_name: 'Justin',
  last_name: 'Rodgers',
  img_1: '',
  img_2: '',
  dept: 'Client Solutions',
  location: 'VA',
  reason: 'I wanted my time and energy to make a difference.'
},
{
  first_name: 'Marc',
  last_name: 'Davis',
  img_1: '',
  img_2: '',
  dept: 'Consumer Marketing & Operations',
  location: 'VA',
  reason: 'I can use my consumer marketing skills for a great cause.'
},
{
  first_name: 'Suvro',
  last_name: 'Khan',
  img_1: 'suvro_khan-1.jpg',
  img_2: 'suvro_khan-2.jpg',
  dept: 'Consumer Marketing & Operations',
  location: 'VA',
  reason: 'the company mission and culture is awesome and I have the opportunity to work with a lot of smart, fun, and motivated individuals. '
},
{
  first_name: 'Ben',
  last_name: 'Foster',
  img_1: '',
  img_2: '',
  dept: 'Product Management',
  location: 'VA',
  reason: 'I like two things: the Earth... and money.'
},
{
  first_name: 'Tom',
  last_name: 'Mercer',
  img_1: '',
  img_2: '',
  dept: 'Product Management',
  location: 'VA',
  reason: 'I love working with smart, passionate people who want to change the world.'
}
/* just a template for now
    {
        first_name: '',
        last_name: '',
        img_1: '',
        img_2: '',
        dept: '',
        location: '',
        reason: ''
    },
*/
]
                },
                {
                    id: 'engineeringculture',
                    label: 'Engineering Culture',
                    url: 'engineering-culture',
                    file: 'content/engineering-culture'
                },
                {
                    id: 'benefits',
                    label: 'Benefits & Perks',
                    url: 'benefits',
                    file: 'content/benefits'
                },                    
                {
                    id: 'films',
                    label: 'OPOWER on Film',
                    url: 'films',
                    file: 'content/films',
                    video: 'life',
                    children: [
                        {
                            id: 'films',
                            label: 'Inside the Printing Process',
                            url: 'films/printing-process',
                            file: 'content/films',
                            video: 'printing'
                        },
                        {
                            id: 'films',
                            label: 'President Obama visits OPOWER',
                            url: 'films/obama',
                            file: 'content/films',
                            video: 'obama'
                        },
                        {
                             id: 'films',
                             label: 'Chief Hula Officer',
                             url: 'films/hula',
                             file: 'content/films',
                             video: 'hula'
                        }
                    ]
                }
            ]
        }
    ];

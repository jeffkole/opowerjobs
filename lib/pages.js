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
        img_1: 'deena-1.jpg',
        img_2: 'deena-2.jpg',
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
    } //,

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

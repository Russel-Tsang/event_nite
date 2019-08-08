import React, { Component } from 'react';
import { EventCards, EventCard } from '../helper_components/event_card';
import { toMonth } from '../../util/calculations';
import SearchBar from '../helper_components/search_bar/search_bar';
import FilterBar from '../splash/filter_bar';

class Splash extends Component {
    constructor(props) {
        super(props)

        this.state = {
            categories: [
                'Category',
                'All',
                'Auto',
                'Boat & Air',
                'Business & Professional',
                'Charities & Causes',
                'Community & Culture',
                'Family & Education',
                'Fashion',
                'Film & Media',
                'Food & Drink',
                'Government',
                'Health',
                'Hobbies',
                'Holiday',
                'Home & Lifestyle',
                'Music',
                'Performing and Visual Arts',
                'School Activities',
                'Science & Tech'
            ],
            searchterm: ''
        }

        this.handleCategoryChange = this.handleCategoryChange.bind(this);
    }

    componentDidMount() {
        this.props.fetchEvents();
    }

    renderEventCards() {
        let filteredEvents = this.props.events.filter(event => this.state.categories.includes(event.category));
        let eventCards = filteredEvents.map((event, idx) => {
            let { begin_month, begin_day, title, begin_time, city, state, id, price, pictureUrl } = event;
            if (!begin_month) begin_month = '';
            if (!begin_day) begin_day = '';
            if (!begin_time) begin_time = '';
            let cardImage = pictureUrl || window.photoBalloons
            return (
                <EventCard
                    key={idx}
                    cardImage={cardImage}
                    month={toMonth(begin_month)}
                    day={"Sat"}
                    date={begin_day}
                    title={title}
                    time={begin_time}
                    venueName={"Blue Casino"}
                    city={city}
                    state={state}
                    price={price}
                    eventId={id}
                />
            );
        });
        return eventCards
    }

    generateCategories() {
        return [
            'Category',
            'All',
            'Auto',
            'Boat & Air',
            'Business & Professional',
            'Charities & Causes',
            'Community & Culture',
            'Family & Education',
            'Fashion',
            'Film & Media',
            'Food & Drink',
            'Government',
            'Health',
            'Hobbies',
            'Holiday',
            'Home & Lifestyle',
            'Music',
            'Performing and Visual Arts',
            'School Activities',
            'Science & Tech'
        ];
    } 

    handleCategoryChange(type) {
        return (event) => {
            switch (type) {
                case "category":
                    if (event.target.value === "Category") return;
                    event.target.value === "All" ? this.setState({ categories: this.generateCategories() }) : this.setState({ categories: [event.target.value] });
                    break;
            }
        }
        
    }


    // *adjust to camelCase*
    render() {
        return (
            <div id="body">
                <img className="splash-banner" src={window.splashBanner2} /> 
                <SearchBar />
                <FilterBar categories={this.generateCategories()} onCategoryChange={this.handleCategoryChange("category")}/>
                <EventCards>
                    {this.renderEventCards()}
                </EventCards>
                <div className="spacer"></div>
            </div>
        )
    }
}

export default Splash;
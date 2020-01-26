using System.Collections.Generic;
using Newtonsoft.Json;
using NzbDrone.Common.Extensions;

namespace NzbDrone.Core.NetImport.Trakt.Popular
{
    public class TraktPopularParser : TraktParser
    {
        private readonly TraktPopularSettings _settings;
        private NetImportResponse _importResponse;

        public TraktPopularParser(TraktPopularSettings settings)
        {
            _settings = settings;
        }

        public override IList<Movies.Movie> ParseResponse(NetImportResponse importResponse)
        {
            _importResponse = importResponse;

            var movies = new List<Movies.Movie>();

            if (!PreProcess(_importResponse))
            {
                return movies;
            }

            var jsonResponse = new List<Movie>();

            if (_settings.TraktListType == (int)TraktPopularListType.Popular)
            {
                jsonResponse = JsonConvert.DeserializeObject<List<Movie>>(_importResponse.Content);
            }
            else
            {
                jsonResponse = JsonConvert.DeserializeObject<List<TraktResponse>>(_importResponse.Content).SelectList(c => c.movie);
            }

            // no movies were return
            if (jsonResponse == null)
            {
                return movies;
            }

            foreach (var movie in jsonResponse)
            {
                movies.AddIfNotNull(new Movies.Movie()
                {
                    Title = movie.title,
                    ImdbId = movie.ids.imdb,
                    TmdbId = movie.ids.tmdb,
                    Year = movie.year ?? 0
                });
            }

            return movies;
        }
    }
}

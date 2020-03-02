$(document).ready(function () {
    $('#searchUser').val('');
    $('#searchUser').on('keyup', function (e) {
        let username = e.target.value;

        // Make request to Github
        $.ajax({
            url: 'https://api.github.com/users/' + username,
            data: {
                client_id: '263af478099c1340a90c',
                client_secret: '71fae87e5e906293a31e903eaecac19f6cd8c9d7'
            }
        }).done(function (user) {
            $.ajax({
                url: 'https://api.github.com/users/' + username + '/repos',
                data: {
                    client_id: '263af478099c1340a90c',
                    client_secret: '71fae87e5e906293a31e903eaecac19f6cd8c9d7',
                    sort: 'created: asc',
                    per_page: 5
                }
            }).done(function(repos){
                $.each(repos, function(index, repo){
                    $('#repos').append(`
                        <div class="container">
                            <div class="card mb-2">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-7">
                                            <strong>${repo.name}</strong>: ${repo.description}
                                        </div>
                                        <div class="col-md-5">
                                            <span class="badge badge badge-primary">Forks: ${repo.forks_count}</span>
                                            <span class="badge badge-secondary">Public Gists: ${repo.watchers_count}</span>
                                            <span class="badge badge-success">Stars: ${repo.stargazers_count}</span>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-4">
                                            <a href="${repo.html_url}" target="_blank" class="btn btn-primary mt-2">Repo Page</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <div>
                    `);
                });
            });
            $('#profile').html(`
                <div class="row">
                    <div class="col-md-3 mr-5">
                        <div class="card">
                            <div class="card-body">
                                <img src="${user.avatar_url}" class="card-img-top avatar" alt="userImage">
                                <div class="card-body">
                                    <h5 class="card-title">${user.name}</h5>
                                    <a target="_blank" class="btn btn-primary mb-2" href="${user.html_url}">View profile</a>
                                    <p class="card-text">${user.bio}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="card mb-4">
                            <div class="card-body">
                                <div class="row justify-content-center mt-3 mb-3">
                                    <span class="mr-4 col-md-2 badge badge-primary">Public repos: ${user.public_repos}</span>
                                    <span class="mr-4 col-md-2 badge badge-secondary">Public Gists: ${user.public_gists}</span>
                                    <span class="mr-4 col-md-2 badge badge-success">Followers: ${user.followers}</span>
                                    <span class="mr-4 col-md-2 badge badge-info">Following: ${user.following}</span>
                                </div>
                                <div class="row justify-content-center">
                                    <ul class="list-group">
                                        <li class="list-group-item">Company: ${user.company}</li>
                                        <li class="list-group-item">Website/blog: ${user.blog}</li>
                                        <li class="list-group-item">Location: ${user.location}</li>
                                        <li class="list-group-item">Member since: ${user.created_at}</li>
                                    </ul>
                                </div>
                                <h3 class="mt-3 mb-4 text-center">Latest Repos</h3>
                                <div class="row">
                                    <div id="repos"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `);
        })
    })
});


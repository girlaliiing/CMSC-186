import { useLocation, useNavigate } from 'react-router-dom';

function JobDetail() {
  const { state } = useLocation();
  const job = state?.job;
  const navigate = useNavigate();

  if (!job) {
    return <p className="text-left p-6">Job details not available.</p>;
  }

  // Extracts a section and returns both the extracted items and the remaining text
  function extractSection(description, sectionKeywords) {
    if (!description) return { items: [], remaining: description };

    const sectionRegex = new RegExp(
      `(?:${sectionKeywords.join('|')})[\\s\\-:]*\\n?([\\s\\S]*?)(?:\\n\\n|$)`,
      'i'
    );
    const match = description.match(sectionRegex);

    if (!match) {
      return { items: [], remaining: description };
    }

    const rawText = match[1];
    const items = rawText
      .split(/[\n•\-–●]+/)
      .map((item) => item.trim())
      .filter((item) => item.length > 10);

    const cleanedDescription = description.replace(match[0], '').trim();

    return {
      items,
      remaining: cleanedDescription,
    };
  }

  // Step-by-step extraction and text removal
  const {
    items: extractedQualifications,
    remaining: descWithoutQualifications,
  } = extractSection(job.job_description, [
    'qualifications',
    'requirements',
    'you should have',
    'candidates must have',
    'skills needed',
  ]);

  const {
    items: extractedResponsibilities,
    remaining: descWithoutResponsibilities,
  } = extractSection(descWithoutQualifications, [
    'responsibilities',
    'duties',
    'tasks',
    'what you’ll do',
    'job functions',
  ]);

  const {
    items: extractedBenefits,
    remaining: cleanedDescription,
  } = extractSection(descWithoutResponsibilities, [
    'benefits',
    'perks',
    'we offer',
    'what you’ll get',
  ]);

  // Use job highlights first, fallback to extracted data
  const qualifications =
    job.job_highlights?.Qualifications?.length > 0
      ? job.job_highlights.Qualifications
      : extractedQualifications;

  const responsibilities =
    job.job_highlights?.Responsibilities?.length > 0
      ? job.job_highlights.Responsibilities
      : extractedResponsibilities;

  const benefits =
    job.job_highlights?.Benefits?.length > 0
      ? job.job_highlights.Benefits
      : extractedBenefits;

  return (
    <div className="p-6 max-w-3xl mx-auto text-left space-y-6">
      {/* Back Button */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 underline"
        >
          ← Back
        </button>
      </div>

      {/* Job Title and Employer */}
      <div className="job-header">
        <h1 className="text-2xl font-bold">{job.job_title}</h1>
        <p className="text-gray-600">
          {job.employer_name} – {job.job_location}, {job.job_state}
        </p>
      </div>

      {/* Job Description */}
      <div>
        <h2 className="text-lg font-semibold">Job Description</h2>
        <p className="mt-2 whitespace-pre-line">{cleanedDescription}</p>
      </div>

      {/* Job Highlights */}
      {(qualifications.length > 0 ||
        responsibilities.length > 0 ||
        benefits.length > 0) && (
        <div>
          <h2 className="text-lg font-semibold">Job Highlights</h2>
          <div className="space-y-2 mt-2">
            {qualifications.length > 0 && (
              <div>
                <strong>Qualifications:</strong>
                <ul className="list-disc ml-5 mt-1">
                  {qualifications.map((q, index) => (
                    <li key={index}>{q}</li>
                  ))}
                </ul>
              </div>
            )}
            {responsibilities.length > 0 && (
              <div>
                <strong>Responsibilities:</strong>
                <ul className="list-disc ml-5 mt-1">
                  {responsibilities.map((r, index) => (
                    <li key={index}>{r}</li>
                  ))}
                </ul>
              </div>
            )}
            {benefits.length > 0 && (
              <div>
                <strong>Benefits:</strong>
                <ul className="list-disc ml-5 mt-1">
                  {benefits.map((b, index) => (
                    <li key={index}>{b}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Additional Job Info */}
      <div>
        <h2 className="text-lg font-semibold">Additional Information</h2>
        <div className="space-y-1 mt-2">
          <p><strong>Country:</strong> {job.job_country}</p>
          <p><strong>Remote Work:</strong> {job.job_is_remote ? 'Yes' : 'No'}</p>
          <p><strong>Employment Type:</strong> 
            {Array.isArray(job.job_employment_type)
              ? job.job_employment_type.join(', ')
              : job.job_employment_type || 'Not specified'}
          </p>
          <p><strong>Salary:</strong> {job.job_salary || 'Not specified'}</p>
          <p><strong>Date Posted:</strong> {job.job_posted_at_datetime_utc}</p>
          <p><strong>Language:</strong> {job.job_language || 'Not specified'}</p>
          <p><strong>Fields:</strong> 
            {Array.isArray(job.job_fields)
              ? job.job_fields.join(', ')
              : job.job_fields || 'Not specified'}
          </p>
          <p><strong>Experience Required:</strong> {job.job_min_years_experience ?? 'Not specified'} years</p>
          <p><strong>Exclude Publishers:</strong> 
            {Array.isArray(job.exclude_job_publishers)
              ? job.exclude_job_publishers.join(', ')
              : job.exclude_job_publishers || 'None'}
          </p>
        </div>
      </div>

      {/* Apply Button */}
      <div className="text-center">
        <a
          href={job.job_apply_link}
          target="_blank"
          rel="noreferrer"
          className="inline-block bg-green-600 text-white px-4 py-2 rounded"
        >
          Apply Now
        </a>
      </div>
    </div>
  );
}

export default JobDetail;
